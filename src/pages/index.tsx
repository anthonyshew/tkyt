import { trpc } from "../utils/trpc";
import { useState } from "react";

export default function IndexPage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [noun, setNoun] = useState("");

  const count = trpc.countTemplates.useQuery();
  const result = trpc.madLibBuilder.useMutation();

  const handleClick = () => {
    result.mutate({
      name,
      amount,
      noun,
    });
  };

  if (result.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Mad Lib Builder</h1>
      <p>There are {count.data} templates.</p>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label htmlFor="number">Number</label>
      <input
        type="text"
        name="number"
        onChange={(e) => setAmount(Number(e.target.value))}
        value={amount}
      />

      <label htmlFor="noun">Noun</label>
      <input
        type="text"
        name="noun"
        onChange={(e) => setNoun(e.target.value)}
        value={noun}
      />
      {result.error ? (
        <p style={{ color: "red" }}>{result.error.message}</p>
      ) : null}
      <button onClick={() => handleClick()}>Fire Mutation</button>
      <p>{result.data}</p>
    </div>
  );
}
