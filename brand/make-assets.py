"""
Turn the supplied logo screenshot (opaque, white background) into web assets:

  src/assets/logo.png        transparent, trimmed  -> light surfaces
  src/assets/logo-light.png  brightened variant    -> deep turquoise surfaces
  public/favicon.png         64px transparent mark
  public/apple-touch-icon.png 180px on ivory

White removal uses the standard "unmultiply against white" trick: a pixel's
alpha is how far it sits from white, and the colour is recovered by dividing
out the white that was blended in. That preserves the antialiasing on the
script and the fine gold linework instead of hard-keying it away.
"""

import colorsys

from PIL import Image

SRC = "brand/logo-source.png"
IVORY = (251, 248, 243)


def unmultiply_white(im):
    im = im.convert("RGB")
    w, h = im.size
    out = Image.new("RGBA", (w, h))
    src = im.load()
    dst = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            a = 255 - min(r, g, b)
            if a <= 4:  # white paper -> fully transparent
                dst[x, y] = (0, 0, 0, 0)
                continue
            base = 255 - a
            dst[x, y] = (
                min(255, max(0, round((r - base) * 255 / a))),
                min(255, max(0, round((g - base) * 255 / a))),
                min(255, max(0, round((b - base) * 255 / a))),
                a,
            )
    return out


def punch(im, sat=1.75, light=0.26, alpha_gain=1.7, drop_wash=True):
    """
    The deep-turquoise colourway.

    Simply lightening the art toward white made it chalky and washed out, so
    instead the hue is kept and the saturation pushed: the script comes back as
    a bright aqua and the wreath as vivid gold, both of which separate hard from
    the #063636 backgrounds.

    The pale watercolour disc behind the script is dropped (it is both faint and
    desaturated, so it is easy to identify) — on a dark background it read as a
    muddy plate rather than a wash, and losing it lets the linework carry the mark.
    """
    im = im.copy()
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if drop_wash and a < 70 and s < 0.34:
                px[x, y] = (0, 0, 0, 0)
                continue
            s = min(1.0, s * sat)
            v = min(1.0, v + (1 - v) * light)
            r2, g2, b2 = colorsys.hsv_to_rgb(h, s, v)
            px[x, y] = (
                round(r2 * 255),
                round(g2 * 255),
                round(b2 * 255),
                min(255, round(a * alpha_gain)),
            )
    return im


def trim(im, pad=6):
    box = im.getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop(
        (max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, b + pad))
    )


def fit(im, size):
    im = im.copy()
    im.thumbnail((size, size), Image.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas.paste(im, ((size - im.width) // 2, (size - im.height) // 2), im)
    return canvas


base = trim(unmultiply_white(Image.open(SRC)))
print("trimmed to", base.size)

# 2x the largest on-screen size (~190px tall in the footer)
mark = base.copy()
mark.thumbnail((640, 640), Image.LANCZOS)

# On ivory the original colourway already sits well; it only wants a touch more
# saturation so it matches the weight of the dark-surface version.
WEBP = dict(format="WEBP", quality=88, method=6)
punch(mark, sat=1.22, light=0.0, alpha_gain=1.12, drop_wash=False).save(
    "src/assets/logo.webp", **WEBP
)
punch(mark).save("src/assets/logo-light.webp", **WEBP)

fit(base, 64).save("public/favicon.png")

touch = Image.new("RGBA", (180, 180), IVORY + (255,))
inner = fit(base, 156)
touch.paste(inner, (12, 12), inner)
touch.convert("RGB").save("public/apple-touch-icon.png")

print("done")
