import { useParams } from "react-router-dom";

function Profile() {
    const params = useParams();

  return <>{JSON.stringify(params)}</>;
}

export default Profile;
