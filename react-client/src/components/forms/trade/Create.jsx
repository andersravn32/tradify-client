import { useContext, useState } from "react";
import useAuthContext from "../../../context/AuthContext";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FormUserSearch from "../search/Users";

const AuthContext = useAuthContext();

function FormTradeCreate() {
  const { auth, setAuth } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [searchUser, setSearchUser] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelect = (e) => {
    console.log(e);
  };

  return (
    <>
      <form id="form-trade-create" className="p-4 flex flex-col space-y-4">
        <FormUserSearch
          label="Modtager"
          placeholder="Indtast brugernavn"
          onSelected={(e) => handleSelect(e)}
        />
        <Input
          type="text"
          size="md"
          placeholder="Indtast titel"
          value={title}
          label="Titel"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Indtast beskrivelse"
          label="Beskrivelse"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <Button type="tertiary" size="md">
            Annuller
          </Button>
          <Button type="primary" size="md">
            Opret handel
          </Button>
        </div>
      </form>
    </>
  );
}

export default FormTradeCreate;
