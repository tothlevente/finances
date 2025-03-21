import { Fallback } from "@/types/Fallback";

import md5 from "crypto-js/md5";

/**
 * The default size (in pixels) for Gravatar images when no size is explicitly specified.
 * This value determines the dimensions of the Gravatar image returned by the API.
 * Typical usage involves setting this value as a fallback when generating Gravatar URLs.
 *
 * @constant {number} DEFAULT_GRAVATAR_SIZE
 */
const DEFAULT_GRAVATAR_SIZE = 200;

/**
 * Specifies the default Gravatar fallback option to be used when a user does not have a corresponding Gravatar image.
 *
 * The value is a key of the Fallback object, allowing the selection of predefined Gravatar styles
 * such as "identicon", "monsterid", "wavatar", etc.
 *
 * This fallback is used to ensure that every user profile has a visual representation, even
 * when no custom avatar is provided.
 */
const DEFAULT_GRAVATAR_FALLBACK: keyof Fallback = "identicon";

/**
 * Indicates whether the default Gravatar image should always be enforced,
 * regardless of whether the user has a custom avatar associated with their
 * email. When set to `true`, the Gravatar service will disregard any user-specific
 * avatars and display the default image instead.
 *
 * @type {boolean}
 */
const DEFAULT_GRAVATAR_FORCE_DEFAULT: boolean = true;

/**
 * Generates a Gravatar URL for the given email address.
 *
 * @param {string} email - The email address to generate the Gravatar for. This is first normalized by trimming and converting to lowercase.
 * @param {keyof Fallback} [fallback=DEFAULT_GRAVATAR_FALLBACK] - The fallback image to display if no Gravatar is associated with the email. The value should be a valid Gravatar fallback option.
 * @param {boolean} [forceDefault=DEFAULT_GRAVATAR_FORCE_DEFAULT] - Whether to force the default Gravatar to be used, even if the email has an associated Gravatar.
 * @param {number} [size=DEFAULT_GRAVATAR_SIZE] - The size of the Gravatar image to be returned. The value should be a positive number representing the pixel dimensions.
 * @returns {string} The constructed Gravatar URL based on the provided parameters. If the email is invalid or empty, it returns an empty string.
 */
export const generateGravatarUrl = (
  email: string,
  fallback: keyof Fallback = DEFAULT_GRAVATAR_FALLBACK,
  forceDefault: boolean = DEFAULT_GRAVATAR_FORCE_DEFAULT,
  size: number = DEFAULT_GRAVATAR_SIZE
): string => {
  if (!email) {
    console.error("Invalid email provided to generateGravatarUrl");
    return "";
  }

  const normalizedEmail = email.trim().toLowerCase();
  const hash = md5(normalizedEmail).toString();
  const forceDefaultString = forceDefault ? "f=y" : "";

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${fallback}&${forceDefaultString}`;
};
