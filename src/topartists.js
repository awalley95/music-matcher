import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const Heading = styled.h1`
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

const ArtistName = styled.h1`
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

const Row = styled.div`
  background-color: green;
  border-radius: 5px;
  width: 70%;
  padding: 15px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border-radius: 15px;
  background-color: rgba(256,256,256,0.3);
`;

const Header = styled(Row)`
  font-weight: 700;
  text-decoration: underline;
  font-size: 22px;
`;

const TableData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin: auto 20px;
  width: 25%;
  text-align: center;
`;

const TableArtist = styled(TableData)`
  width: 50%;
`;

class TopArtists extends React.Component {
  constructor(props) {
    super(props);        
    this.formatCard = this.formatCard.bind(this);
    this.assembleTable = this.assembleTable.bind(this);
  }

  formatCard() {

    let display = [];

    if (this.props.data.duplicatesFound === 'data set') { 

      this.props.data.topArtists.forEach((artist) => {
        display.push(
          <Card key={artist[0]}>
            <Img src={artist[2]} alt={`The artist art for ${artist[1]}`} />
            <ArtistName>{artist[1]}</ArtistName>
          </Card>);
      });
      return display;
    } else {
      return <div></div>
    }
  }

  assembleTable() {
    let display = [];

    display.push(
      <Header key="header">
        <TableArtist>Artist</TableArtist>
        <TableData>No. of Songs</TableData>
        <TableData>Percent of Songs</TableData>
      </Header>
    )

    if (this.props.data.duplicatesFound === 'data set') {
      for (let artist of this.props.data.duplicateArtists) {
        display.push(
          <Row key={artist[0]}>
            <TableArtist>{artist[1]}</TableArtist>
            <TableData>{artist[2]}</TableData>
            <TableData>{((artist[2]/this.props.data.duplicatesLength)*100).toFixed(2) + "%"}</TableData>
          </Row>      
        )
      }
      return display;
    } else {
      return <div></div>
    }
  }

  render() {
    return(
      <MainContainer>
        <Heading>Here are your top artists in common:</Heading>
        <CardContainer>
          {this.formatCard()}
        </CardContainer>
        <Heading>See all of your artist(s) in common:</Heading>
        {this.assembleTable()}
      </MainContainer>
    )
  }

}

export default TopArtists;