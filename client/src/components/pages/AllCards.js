import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";

import orderBy from "lodash/orderBy";
import axios from "axios";

// const memoryCard = memoryCards[3];

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: '[["createdAt"], ["desc"]]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/marshhpc/white-bear-mpa/master/src/moc-data/memory-cards.json"
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filterByInput(e) {
      e.preventDefault();
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];
      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         const lowerCasedImagery = memoryCard.imagery.toLowerCase();
         const lowerCasedAnswer = memoryCard.answer.toLowerCase();
         if (
            lowerCasedImagery.includes(lowerCasedInput) ||
            lowerCasedAnswer.includes(lowerCasedInput)
         ) {
            return true;
         }
         return false;
      });
      this.setState({ displayedMemoryCards: filteredMemoryCards }, () => {
         this.setMemoryCards();
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      const copyOfDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      const toJson = JSON.parse(this.state.order);
      console.log(...toJson);
      const orderedMemoryCards = orderBy(copyOfDisplayedMemoryCards, ...toJson);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
   }

   // setMemoryCardsOrder(e) {
   //    const newOrder = e.target.value;
   //    console.log(newOrder);
   //    const copyOfMemoryCards = [...this.state.memoryCards];
   //    const toJson = JSON.parse(newOrder);
   //    const orderMemoryCards = orderBy(copyOfMemoryCards, ...toJson);
   //    console.log(orderMemoryCards);
   //    this.setState({ order: newOrder, memoryCards: orderMemoryCards });
   // }

   render() {
      return (
         <AppTemplate>
            <div>
               <form className="row mb-3">
                  <div className="form-group col-8">
                     <input
                        type="text"
                        className="form-control"
                        id="search-input"
                        placeholder="Search for a word"
                     />
                  </div>
                  <div className="col-4">
                     <button
                        className="btn btn-primary btn-block btn-sm"
                        onClick={(e) => this.filterByInput(e)}
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
                        <option value='[["createdAt"], ["desc"]]'>
                           Most recent
                        </option>
                        <option value='[["createdAt"], ["asc"]]'>Oldest</option>
                        <option value='[["totalSuccessfulAttempts", "createdAt"],["asc", "asc"]]'>
                           Hardest
                        </option>
                        <option value='[["totalSuccessfulAttempts", "createdAt"],["desc", "desc"]]'>
                           Easiest
                        </option>
                     </select>
                  </div>
               </div>
            </div>
            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
