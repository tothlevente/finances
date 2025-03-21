/**
 * Represents the different types of fallback options.
 *
 * @property {"mp"} mp - Mystery Person, a simple, cartoon-style silhouetted outline of a person.
 * @property {"identicon"} identicon - A geometric pattern based on a hash of the email address.
 * @property {"retro"} retro - A generated, 8-bit arcade-style pixelated face.
 * @property {"wavatar"} wavatar - A generated face with differing features and backgrounds.
 * @property {"monsterid"} monsterid - A generated, colorful monster with different features.
 * @property {"robohash"} robohash - A generated robot with different features.
 */
export type Fallback = {
  mp: "mp";
  identicon: "identicon";
  retro: "retro";
  wavatar: "wavatar";
  monsterid: "monsterid";
  robohash: "robohash";
};
