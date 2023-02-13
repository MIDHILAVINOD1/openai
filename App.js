import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-n0osOGWl9oDnJrkdwU8gfuvc",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  const [Name, setName] = useState('');
  const [Profession, setProfession] = useState('');
  const [Movies, setMovies] = useState('');
  const [Languages, setLanguages] = useState('');
  const [Age, setAge] = useState('');
  const [result, setResult] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleMoviesChange = (e) => {
    setMovies(e.target.value);
  };

  const handleLanguagesChange = (e) => {
    setLanguages(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    console.log(Name,Profession,Movies,Languages,Age);

    let value = `Generate a unique plagiarism free profile content in one paragraph 100 words for 
    name :  ${Name} 
    Profession :  ${Profession}
    Movies Acted on : ${Movies}
    Languages Speak -  ${Languages}
    Age : ${Age}`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: value,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setResult(response.data?.choices[0].text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={Name} onChange={handleNameChange} />
      </label>
      <br />
      <br />
      <label>
        Profession:
        <input type="text" value={Profession} onChange={handleProfessionChange} />
      </label>
      <br />
      <br />
      <label>
      Movies:
      <input type="text" value={Movies} onChange={handleMoviesChange} />
    </label>
    <br />
    <br />
    <label>
      Languages :
      <input type="text" value={Languages} onChange={handleLanguagesChange} />
    </label>
    <br />
    <br />
    <label>
    Age :
    <input type="text" value={Age} onChange={handleAgeChange} />
  </label>
  <br />
  <br />
      <input type="submit" value="Submit" />
      <br />
      <br />
      {result ? (
        <label>
          Description: <p>{result}</p>
        </label>
      ) : (
        <label>loading...</label>
      )}
    </form>
  );
}

export default App;
