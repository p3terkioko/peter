import { getNowPlaying, getLastPlayed } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status !== 204 && response.status <= 400) {
      const song = await response.json();

      if (song.item !== null) {
        return NextResponse.json({
          album: song.item.album.name,
          albumImageUrl: song.item.album.images[0].url,
          artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
          isPlaying: song.is_playing,
          songUrl: song.item.external_urls.spotify,
          title: song.item.name,
        });
      }
    }

    // Not playing — fall back to last played
    const recentRes = await getLastPlayed();
    if (recentRes.ok) {
      const recent = await recentRes.json();
      const track = recent.items?.[0]?.track;
      if (track) {
        return NextResponse.json({
          album: track.album.name,
          albumImageUrl: track.album.images[0].url,
          artist: track.artists.map((_artist: any) => _artist.name).join(", "),
          isPlaying: false,
          songUrl: track.external_urls.spotify,
          title: track.name,
        });
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    return NextResponse.json({ isPlaying: false });
  }
}
