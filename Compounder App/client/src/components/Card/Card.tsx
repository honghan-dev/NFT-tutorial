import React from 'react'
import style from "./Card.module.css";

const { cardContainer } = style;

type CardProp = {

}

const Card = ({}: CardProp) => {
  return (
    <div className={cardContainer}>
      Total balance
    </div>
  )
}

export default Card