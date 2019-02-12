import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import profile from '../images/profile.jpg';
import { SocialIcon } from 'react-social-icons';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import '../CSS/Home.css'
class Home extends Component {
 

  renderArticlePage = ({ match }) => {
    const id = match.params.id;
    // find the article:
    // eslint-disable-next-line eqeqeq
    const article = this.props.list.find(article => article.id == id);
    // we use double equality because our ids are numbers, and the id provided by the router is a string
    if (!article) {
      return <div>{id} not found</div>;
    }
    return (
      <p>www</p>
    );
  };


  render() {
    const articles = this.props.list;

    return (
        <div>
<Header />
<div className="home">
<h1 className='name'>Chloe Domat</h1>
<div className="profile">
<img   id="profile-img" src={profile}   width='300px'
    height='300px' alt='chloe'/>
</div>
<div className="right">
<div className="para">
<p className="info-p"><span style={{fontSize:'30px'}}>""</span>Chloe Domat is an award-winning multimedia journalist currently based in Beirut. 
  She reports for various international media outlets including France 24, Ouest France, 
  Global Finance and Middle East Eye. Domat has also worked with LCI (TF1 Group Paris). 
  She has a master’s degree in political science from the American University of Beirut and studied journalism and international relations at Sciences Po Paris. 
  She speaks English, French and Arabic. Erdiet proin</p>
  </div>
  <div className="last3">
  <h2 className="h2">Latest posts</h2>
  <ul>
   {articles.filter((i ,index) => (index < 3)).map((i,index)=> (<li>{i.img_path} {i.title} - {i.date}<br />{i.text}<br />
   <button onClick={() =>{window.location.href=`http://localhost:3000/article/${i.id}`}}>continue</button></li>))
  }
        </ul>
        </div>
        </div>
  <br />
  <br />
  <div className="tw-in">
  <div className="info">
  <p >Chloe Domat</p>
  <p>Print & video journalist 
    Middle East and North Africa English and French @France24 @OuestFrance 
    @GFMag @LeSoir @OrientXXI @MiddleEastEye</p>
    <br />
        <SocialIcon url="http://facebook.com/" />
        <SocialIcon url="http://twitter.com/" />
        <SocialIcon url="http://instagram.com/" />
        <SocialIcon url="http://gmail.com/" />
  </div>
  <div className="twitter">
  <TwitterTimelineEmbed
  sourceType="profile"
  screenName="saurabhnemade"
  options={{height: 400}}
/>
</div>
</div>
</div>
  <div className="footer">
                <Footer/> 
                </div>   
  
  </div>
  
    );
  }
}

export default Home;
