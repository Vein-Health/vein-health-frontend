from pathlib import Path

from PIL import Image


ASSET_DIR = Path(__file__).resolve().parents[1] / "public" / "assets" / "landing"
PNG_FILES = sorted(ASSET_DIR.glob("*.png"))


def optimize(source: Path) -> None:
    destination = source.with_suffix(".webp")

    with Image.open(source) as image:
        # Preserve the source pixel dimensions and alpha channel. WebP keeps
        # RGBA transparency, so the owl assets do not acquire a white matte.
        image.save(
            destination,
            format="WEBP",
            # Keep the approved head-only mark lossless. The full-body
            # companion is not a current runtime dependency and does not need
            # the slower lossless pass.
            lossless=source.name == "vee-bold.png",
            method=6,
            quality=92,
        )

        print(
            f"{source.name}: {source.stat().st_size:,} -> "
            f"{destination.stat().st_size:,} bytes ({image.width}x{image.height}, {image.mode})"
        )


for png_file in PNG_FILES:
    optimize(png_file)
