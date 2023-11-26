import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#F5E000" : "white" 
    }
    return (
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {Array.from({ length: props.value }).map((_, index) => (
        <div key={index} className="dot"></div>
      ))}
        </div>
    )
}