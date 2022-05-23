# 11056-wit-2019

## Rationale

### Early Development

The initial stage of development saw the collection of inspirations and the creation of low fidelity wire frames. These were intended to be a rough guide for key elements I planned to create, and were not a realistic demonstration of the final layout. This was to be decided throughout the real development of the site by “sketching in code.” This method had the advantage of bringing about a solution that was efficient and feasible given code language restrictions and time allowed. The final solution was a website that well displays the content provided using minimal html and css.

### Inspiration

The major drive for the site’s aesthetics was minimalism. The content provided was text heavy with a number of architectural photos as well. It was decided early that a visual minimal approach was the best solution for the content. An important inspiration for the site was [Ark Shelter.](https://ark-shelter.com/ "Ark Shelter Home") This site, while displaying less text and more imagery, demonstrated a fine use of minimal styling that lets the content speak for itself. Black text on a white background with few extra elements gives the text great dominance, and compliments the images well. This was a major inspiration for the two column approach seen on my site. By  building support to place text and images on either column, a pleasant flow could be created between the two. This approach was also chosen to break up large bodies of text and repetitive layouts that would otherwise overwhelm the reader.

### Implimentation

In support of a number of device widths, multiple breakpoints were designed for the width of the site. The widths were chosen based on the text content to keep characters per line close to recommendations of 55 – 100, while still taking images and page height into consideration. On larger displays, columns were used to modify line length, however a mix of columns and full width paragraphs was necessary for the desired flow.

#### Navigation

The original vertical menu plan, while functional was not ideal on all intended devices. To best support both mobile and desktop users, two navigation menus were developed. Aimed at desktop use, a horizontal menu provided the user visibility of all pages from the top of each page while taking up minimal screen real estate.
Given the relatively narrow width of mobile screens, a vertical menu was implemented to make the best use of the portrait screen, while also placing menu items away from the top edge of the screen and towards a [thumb friendly zone](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/). To hide the menu when not in use, a hamburger style menu button was used to open and close the menu.

#### Compromise
Image containers presented a challenge for the responsive layout, as my solution involved a varying aspect ratio for the images as the window width is changed. This resulted in some cropping to fit the image into the layout. As a result, an anchor position had to be chosen on the image, ideally the subject, around which clipping could happen to keep the focus in frame. Given the images used this was not a major issue as the goal of the images was to demonstrate the overall architectural features and a portion of the image still presented the concept. With further development of the website, image presentation would be a key focus, to find a solution that best presents the images while maintaining the site layout.
