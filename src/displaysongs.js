import React from 'react';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import './loading.css';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1
  }
`;

const MainContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  animation: 1s ${fadeIn} ease-out;
`;

const Header = styled.h1`
  text-align: center;
  margin: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  justify-content: left;
`;

const Card = styled.div`
  width: 40%;
  padding: 15px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  border-radius: 15px;
  background-color: rgba(256,256,256,0.3);
`;

const SongTitle = styled.h1`
  font-size: 24px;
  font-weight: 700px;
  margin: 0 0 10px 25px;
  padding: 0;
`;

const Artist = styled.h2`
  font-size: 20px;
  font-weight: 550px;
  margin: 0 0 0 25px;
  padding: 0;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin: 10 18px 10 10;
`;

class DisplaySongs extends React.Component {
  constructor(props) {
    super(props);        
    this.formatCard = this.formatCard.bind(this);
    }

    formatHeader() {
      //Determine the display names
      let mainUserID = this.props.data.mainUsername;
      let mainUsername = this.props.data.usernames[mainUserID];
      let usernames = Object.values(this.props.data.usernames);
      _.pull(usernames, mainUserID, mainUsername); //remove the main user from the display names
      if (usernames.length === 1) {
        usernames = ' and ' + usernames
      } else if (usernames.length === 2) {
        usernames = `, ${usernames[0]} and ${usernames[1]}`
      } else {
        usernames = `, ${usernames[0]}, ${usernames[1]}, and ${usernames[2]}`
      }
      
      if (this.props.data.duplicatesFound === 'data set') {
        //Determine how many songs in common
        let songs = '';
        if (this.props.data.duplicateSongs === "none") {
          songs = 'no songs'
        } else if (this.props.data.duplicatesLength === 1) {
          songs = '1 song'
        } else {
          songs = `${this.props.data.duplicatesLength} songs`
        }

        //Final phrase
        return <Header>You{usernames} have {songs} in common!</Header>
      } else {
        return <div></div>
      }
    }

    formatCard() {
      let display = [];

      if (this.props.data.duplicatesFound === 'data set') {
        this.props.data.duplicateSongs.forEach((duplicate) => {
          display.push(
          <Card key={duplicate.songID}>
            <Img src={duplicate.image} alt={`The cover art of the song's album, "${duplicate.albumName}"`}/>
            <div>
              <SongTitle>{duplicate.name}</SongTitle>
              <Artist> by {duplicate.artist}</Artist>
            </div>
          </Card>);
        })
        return display;
      } else {
        return <div></div>
      }
    }
     
  render() {
    return (
      <div>
        <MainContainer>
          {this.formatHeader()}
          <CardContainer>
            {this.formatCard()}
          </CardContainer>
        </MainContainer>
      </div>  
    )
  }
}

export default DisplaySongs;