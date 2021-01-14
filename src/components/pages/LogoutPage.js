import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UseDeleteData from "../../hooks/UseDelete";
import { UserContext } from "../../contexts/UserContext";
import APIs from "../files/ApiRequestURL.json";

const LogoutPage = (props) => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    UseDeleteData(APIs.logout, user.token, (response) => {
      if (response.status === 204) {
        setUser({
          username: false,
          token: false,
        });
        return history.push("/");
      }
    });
    return history.goBack("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return "";
};

export default LogoutPage;
