import { useSession} from "next-auth/react";

const main = () => {
    const { data: session, status } = useSession();

    return (<p>{session.user.name}</p>)
};
export default main;