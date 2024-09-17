import { useRouter } from "next/router";
import NavButton from "./NavButton";

const NavBar = (props: any) => {
    const router = useRouter()

    return (
        <div className="menu-buttons">
            {
                props.navButtons.map((button: any) => (
                    <NavButton
                        key={button.path}
                        path={button.path}
                        label={button.label}
                        router={router}
                    />
                ))
            }
        </div>
    )
};

export default NavBar;