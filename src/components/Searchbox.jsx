import React from "react";
import allemojis from "../complete";
import Entry from "./Entry";
import ReactMarkdown from "react-markdown";
import emoji from "emoji-dictionary";
import { useGlobalContext } from "../contextapi";

function Search() {
  const {
    searchEmoji,
    sortedList,
    searched,
    setSearchEmoji,
    setSortedList,
    setSearched,
  } = useGlobalContext();

  const emojiSupport = (text) =>
    text.value.replace(/:\w+:/gi, (name) => emoji.getUnicode(name));

  function createEmojiCard(card) {
    return (
      <Entry
        key={card.id}
        img={
          <ReactMarkdown
            source={card.markdown}
            renderers={{ text: emojiSupport }}
          />
        }
        name={card.name}
        markdown={card.markdown}
      ></Entry>
    );
  }

  function handleChange(e) {
    const searchItem = e.target.value.toLowerCase();

    searchItem === "" ? setSearched(true) : setSearched(false);

    setSearchEmoji(searchItem);

    setSortedList(
      allemojis.filter(
        (emoji) => emoji.markdown.toLowerCase().indexOf(searchEmoji) >= 0
      )
    );
    //  || emoji.name.toLowerCase().indexOf(searchEmoji) >= 0))
  }

  return (
    <div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={handleChange} />
      </div>

      <div className="emoji-wrapper">
        {sortedList.map(createEmojiCard)}
        {searched ? allemojis.map(createEmojiCard) : null}
      </div>
    </div>
  );
}

export default Search;
