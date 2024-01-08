import { Button } from "@/components/ui/button";

const CommentMoreButton = () => {
  return (
    <Button type="button" variant="ghost" size="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M12 6.07327C12.4142 6.07327 12.75 6.40906 12.75 6.82327C12.75 7.23749 12.4142 7.57327 12 7.57327C11.5858 7.57327 11.25 7.23749 11.25 6.82327C11.25 6.40906 11.5858 6.07327 12 6.07327ZM12 12.0733C12.4142 12.0733 12.75 12.4091 12.75 12.8233C12.75 13.2375 12.4142 13.5733 12 13.5733C11.5858 13.5733 11.25 13.2375 11.25 12.8233C11.25 12.4091 11.5858 12.0733 12 12.0733ZM12 18.0733C12.4142 18.0733 12.75 18.4091 12.75 18.8233C12.75 19.2375 12.4142 19.5733 12 19.5733C11.5858 19.5733 11.25 19.2375 11.25 18.8233C11.25 18.4091 11.5858 18.0733 12 18.0733Z"
          fill="#525252"
          stroke="#525252"
          strokeWidth="1.5"
        />
      </svg>
    </Button>
  );
};

export default CommentMoreButton;
