import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { generateGravatarUrl } from "@/services/gravatarService";
import { useEffect, useState } from "react";

interface Props {
  user: { email: string; avatar?: string };
}

export const HeaderAvatar = ({ user }: Props) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    } else {
      setAvatar(generateGravatarUrl(user.email));
    }
  }, [user.avatar, user.email]);

  const generateFallbackText = (input: string): string =>
    input
      .split(" ", 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("");

  return (
    <Avatar
      aria-label="User avatar"
      className="h-8 w-8 rounded-lg overflow-hidden"
    >
      <AvatarImage
        src={avatar}
        alt={user.email}
      ></AvatarImage>
      <AvatarFallback>{generateFallbackText(user.email)}</AvatarFallback>
    </Avatar>
  );
};
