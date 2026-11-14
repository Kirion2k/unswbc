# Toronto badminton club reference notes

Reference: https://www.uoftbadmintonclub.com/#/
Inspected in a desktop browser, including the page after scrolling.

## Useful interactions

- A small shuttle follows a curved flight path in the right margin. Its travel is tied to scroll position, giving the page a badminton-specific detail and a sense of reading progress.
- Buttons briefly send a shuttle across on hover. The animation is short, and the original action remains legible.
- A sun/moon control changes the whole interface between light and dark surfaces. The choice persists between visits and initially follows the device preference.
- The visual effects support the club content rather than becoming a separate introductory sequence.

## UNSWBC adaptation

Keep the existing UNSW navy identity, photographs, larger centred cards, and routes. Implement the interactions with the installed Framer Motion and MUI libraries and an original small vector shuttle; do not import Toronto's assets or site code.

The scroll shuttle occupies the left gutter between the viewport edge and the central cards on screens at least 1400px wide. Reading progress maps directly to a top-to-bottom flight with three clear in-and-out curves; scrolling upward retraces the same path. It never loops or crosses the content. Its small size, subdued opacity, and short fading tail keep it quiet. It fades in during scrolling and fully fades out after scrolling stops. It ignores pointer input and is hidden on narrow screens and when reduced motion is requested.

The shared action button sends a shuttle through a brief 0.7-second arc on hover and keyboard focus, with two faint swoosh streaks. The button target stays stationary; horizontal flight and the vertical arc animate separately for a continuous sweep. Touch users retain the normal action without needing hover. Reduced motion retains ordinary colour and focus feedback.

Theme colours cover page canvas, cards, primary and secondary text, subtle panels, borders, forms, and FAQs. Photo heroes, white buttons on navy panels, and the navy footer preserve their intended contrast. The header toggle is available on desktop and mobile; the selected theme is stored locally. A small initial script applies the selected theme before React mounts.
