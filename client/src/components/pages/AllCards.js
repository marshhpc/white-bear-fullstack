import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";
const userId = "16672b8b-6946-4016-b7b8-f450b911f69e";

// const memoryCard = memoryCards[3];

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      return (
         <AppTemplate>
            <div>
               <form className="row mb-3">
                  <div className="form-group col-8">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Search for a word"
                        id="search-input"
                     />
                  </div>
                  <div className="col-4">
                     <button
                        className="btn btn-primary btn-block btn-sm"
                        onClick={() => this.setSearchTerm()}
                     >
                        Search
                     </button>
                  </div>
               </form>
               <div className="row my-4 no-gutters">
                  <div className="col-4">
                     <p className="text-muted mt-1">Sort cards by</p>
                  </div>
                  <div className="col-8">
                     <select
                        value={this.state.order}
                        className="form-control form-control-sm"
                        onChange={(e) => this.setOrder(e)}
                     >
                        <option value="memory_cards.created_at%20DESC">
                           Most recent
                        </option>
                        <option value="memory_cards.created_at%20ASC">
                           Oldest
                        </option>
                        <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                           Hardest
                        </option>
                        <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                           Easiest
                        </option>
                     </select>
                  </div>
               </div>
            </div>
            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
