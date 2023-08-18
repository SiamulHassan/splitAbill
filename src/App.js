import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function App() {
  const [showFrnd, setShowFrnd] = useState(false);
  const [addToFrndList, setAddToFrndList] = useState(initialFriends);
  const handleAddFrnd = () => {
    setShowFrnd((prev) => !prev);
  };
  const handleOnAddFrnd = (addFrndData) => {
    setAddToFrndList((prevFrndArr) => [...prevFrndArr, addFrndData]);
    setShowFrnd(false);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList addToFrndList={addToFrndList} />
        {showFrnd && <FormAddFrnd onAddFrnd={handleOnAddFrnd} />}
        <Button onClicked={handleAddFrnd}>
          {showFrnd ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function Button({ children, onClicked }) {
  return (
    <>
      <button className="button" onClick={onClicked}>
        {children}
      </button>
    </>
  );
}

function FriendList({ addToFrndList }) {
  const frndArr = addToFrndList;
  return (
    <ul>
      {frndArr.map((frnd) => (
        <Friend frnd={frnd} key={frnd.id} />
      ))}
    </ul>
  );
}

function Friend({ frnd }) {
  return (
    <>
      <li>
        <img src={frnd.image} alt={frnd.name} />
        <h3>{frnd.name}</h3>
        {frnd.balance < 0 && (
          <p className="red">
            You owe {frnd.name} ${Math.abs(frnd.balance)}
          </p>
        )}
        {frnd.balance > 0 && (
          <p className="green">
            {frnd.name} owes you ${Math.abs(frnd.balance)}
          </p>
        )}
        {frnd.balance === 0 && <p>You and {frnd.name} are even</p>}

        <Button>Select</Button>
      </li>
    </>
  );
}

function FormAddFrnd({ onAddFrnd }) {
  const [name, setFndName] = useState("");
  const [image, setImg] = useState("https://i.pravatar.cc/48");
  const id = crypto.randomUUID();

  const handleAddFrndSub = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const newFrnd = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    setFndName("");
    onAddFrnd(newFrnd);
  };
  return (
    <form className="form-add-form" onSubmit={handleAddFrndSub}>
      <label>🧛‍♂️ Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setFndName(e.target.value)}
      />

      <label>🔲 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImg(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💲 Bill Value</label>
      <input type="text" />

      <label>🧛‍♂️ Your expense</label>
      <input type="text" />

      <label>🧛‍♂️ X's expense</label>
      <input type="text" disabled />

      <label>💰 Who is palying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
export default App;
