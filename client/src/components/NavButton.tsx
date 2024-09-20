import Link from "next/link";
import { useRouter } from "next/router";

const NavButton = (props: any) => {
  const router = useRouter();

  const isActive = router.asPath === (props.path === "/" ? "/" : props.path);

  return (
    <Link
      href={props.path}
      type="button"
      className={`${isActive ? "bg-sky-600 p-8" : "bg-sky-400 p-8"}`}
    >
      <span className="menu-label text-white">{props.label}</span>
    </Link>
  );
};

export default NavButton;
