import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { Container,Card,Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardContainer = styled.div`
    display: flex;
    height: 75vh;
    align-items: center;
    justify-content: center;
`
const CardHeader = styled.div`
    height: 20rem;
    background-color: blue;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PriceCircle =styled.div`
    border: 0.5rem solid white ;
    width: 12.5rem;
    height: 12.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19,0.342);
`
const PriceText = styled.p`
    font-size:2rem ;
    color: white;
    text-shadow: 0.1rem 0.1rem rgba(19,20,19,0.342);
`
const ArticlesPlan = () => {
    const [prices,setPrices]= useState<any[]>([])
    useEffect(()=>{
        fetchPrices()
        // console.log(prices)
    },[])
    const fetchPrices = async()=>{
        const response = await axios.get("http://localhost:8080/subs/prices");
        setPrices(response.data.data)
        console.log(response.data.data)
        
    }
    const backgroundColors:any={
        Basic:"rgb(104,219,104)",
        Standard:"rgba(185,42,23,0.835)",
        Premium:"pink"
    }
  return (
    <Container>
             <CardContainer>
        {prices?.map((price:any)=>{
            return(
                <Card style={{width:"18rem",marginRight:"2rem"}}>
                    <CardHeader style={{backgroundColor:backgroundColors[price.nickname] }}>
                    <PriceCircle>
                        <PriceText>
                        {price.unit_amount} XAF 
                        </PriceText>
                    </PriceCircle>
                    </CardHeader>
                    <Card.Body>
                        <Card.Title style={{fontSize:'2rem'}}>{price.nickname}</Card.Title>
                        <Button variant='primary' className='mt-2'>
                            Buy Now
                        </Button>
                    </Card.Body>
                </Card>
                // <div>{price.nickname}</div>
            )
        })}
    </CardContainer>
    </Container>
   
  )
}

export default ArticlesPlan