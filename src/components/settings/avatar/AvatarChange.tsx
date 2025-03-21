import { generateGravatarUrl } from "@/services/gravatarService";
import { updateAvatar } from "@/services/profileService";
import { useSession } from "@/context/SessionContext";
import { useAvatar } from "@/context/AvatarContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const AvatarChange = () => {
  const [avatars, setAvatars] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { setAvatar } = useAvatar();
  const { session } = useSession();

  useEffect(() => {
    const handleGetAvatars = async () => {
      if (session) {
        setLoading(true);

        const email = session.user.email;
        const avatars = [
          generateGravatarUrl(email!, "mp", false),
          generateGravatarUrl(email!, "identicon"),
          generateGravatarUrl(email!, "retro"),
          generateGravatarUrl(email!, "monsterid"),
          generateGravatarUrl(email!, "wavatar"),
          generateGravatarUrl(email!, "robohash"),
        ];

        setAvatars(avatars);
        setLoading(false);
      }
    };

    handleGetAvatars();
  }, []);

  const handleAvatarChange = async (avatar: string) => {
    if (session) {
      setLoading(true);

      const { error } = await updateAvatar(session.user.id, avatar);

      if (error) {
        console.error("Error updating avatar:", error);
      }

      setAvatar(avatar);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="scroll-m-20 text-sm tracking-tight">
        Please wait, your avatars are loading...
      </p>
    );
  }

  if (!avatars) {
    return (
      <p className="scroll-m-20 text-sm tracking-tight text-orange-600">
        It is not possible to load your avatars yet. Please try again later. If the problem
        persists, please contact support. We apologize for the inconvenience.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {avatars!.map((value, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          onClick={() => handleAvatarChange(value)}
          className="flex-shrink-0 my-3"
          aria-disabled={loading}
          disabled={loading}
        >
          <img
            className="h-8 w-8 rounded-lg overflow-hidden"
            alt="avatar"
            src={value}
          />
        </Button>
      ))}
    </div>
  );
};
