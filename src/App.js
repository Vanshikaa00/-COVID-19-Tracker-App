import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import styles from './styles.module.css'
import NumberFormat from 'react-number-format';
import format from 'date-format';
import { lowerCase } from "text-lower-case";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
        axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountries = results.filter(item => {
    console.log(item);
    return searchCountry !== "" ? lowerCase(item.country).includes(lowerCase(searchCountry)) : item;
  })

  const countries = filterCountries.map((data, i) => {
    return (
      <Card key={i} bg="light" text="dark" className="text-center" style={{ margin: "10px" }}>
        <Card.Img height="200" variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title className={styles.countryname}>
            {data.country}</Card.Title>
          <Card.Text className={styles.textstyle}>
            <b>  Cases: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.cases} />


          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b>Today's Cases: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.todayCases} />

          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b> Today's Deaths: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.todayDeaths} />
          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b> Today Recovered: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.todayRecovered} />
          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b> Tests: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.tests} />
          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b>  Active: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.active} />
          </Card.Text>
          <Card.Text className={styles.textstyle}>
            <b> Critical: </b>
            <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={data.critical} />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  });



  var queries = [{
    columns: 2,
    query: 'min-width:500px'
  }, {
    columns: 3,
    query: 'min-width:1000px'
  }];

  return (
    <div class="container-fluid">
      <div class="text-center text-primary my-4"><span className={styles.textsize}> COVID-19 Live Statistics</span></div>
<div className={styles.border}></div>

      <div class="row ">

        {/* Column 1 */}
        <div class="col-sm-3 col-md-3 col-lg-3">

          <div class="row"  >
            <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>
              <Card.Body>
                <Card.Title className={styles.textstyle}>Cases</Card.Title>
                <Card.Text>
                  <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={latest.cases} />

                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className={styles.textstyle}>Last updated {lastUpdated}</small>
              </Card.Footer>
            </Card>
          </div>
          <div class="row">
            <Card bg="danger" text="white" className="text-center" style={{ margin: "10px" }}>
              <Card.Body>
                <Card.Title className={styles.textstyle}>Deaths</Card.Title>
                <Card.Text>
                  <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={latest.deaths} />

                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className={styles.textstyle}>Last updated {lastUpdated}</small>
              </Card.Footer>
            </Card>
          </div>
          <div class="row">
            <Card bg="success" text="white" className="text-center" style={{ margin: "10px" }}>
              <Card.Body>
                <Card.Title className={styles.textstyle}>Recovered</Card.Title>
                <Card.Text>
                  <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" displayType={'text'} value={latest.recovered} />

                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className={styles.textstyle}>Last updated {lastUpdated}</small>
              </Card.Footer>
            </Card>
          </div>
        </div>

        {/*column 2 */}
        <div class="col-sm-9 col-md-9 col-lg-9 " >
          <Form style={{ margin: "15px" }}>
            <Form.Group controlId="formGroupSearch">
              <Form.Control type="text" placeholder="Search for a  country name..."
                onChange={e => setSearchCountry(e.target.value)} />
            </Form.Group>
          </Form>
          <Columns queries={queries}>{countries}</Columns>
        </div>
      </div>


    </div>
  );
}

export default App;
