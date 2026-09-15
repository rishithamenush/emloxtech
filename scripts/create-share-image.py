"""Render the site's typographic social card. Requires Pillow; not part of deployment."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
image = Image.new('RGB', (1200, 630), '#fafaf8')
draw = ImageDraw.Draw(image)
font_path = '/System/Library/Fonts/Helvetica.ttc'
def font(size): return ImageFont.truetype(font_path, size)
draw.rectangle((0,0,16,630), fill='#c6ee7d')
draw.text((72,54), 'EmloX Tech', font=font(40), fill='#223e31')
draw.text((72,190), 'Web & mobile apps.', font=font(76), fill='#1b211c')
draw.text((72,282), 'From idea to launch.', font=font(76), fill='#223e31')
draw.line((72,416,1128,416), fill='#c8cfc4', width=2)
draw.text((72,456), 'Applications / Websites / IT solutions', font=font(30), fill='#485449')
draw.text((72,550), 'www.emloxtech.com', font=font(25), fill='#223e31')
image.save(Path(__file__).resolve().parent.parent / 'public' / 'social-preview.png', optimize=True)
