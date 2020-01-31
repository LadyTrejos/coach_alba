import Header from './Header';

const homeStyle = {
  margin: 20,
  padding: 20,
  background:'#2A9AD2',
  border: '1px solid #DDD',
  borderRadius:'10px'

};

const Home = props => (
  <div style={homeStyle}>
    <Header />
    {props.children}
  </div>
);

export default Home;