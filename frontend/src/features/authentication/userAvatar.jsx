import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-4 text-base font-medium text-gray-100 capitalize">
      <img
        src={user.avatar || "/default-user.jpg"}
        alt={`Avatar of omar`}
        className="object-cover object-center w-10 h-10 border-2 border-gray-100 rounded-full lg:w-10 lg:h-10"
      />
    </div>
  );
}

export default UserAvatar;
