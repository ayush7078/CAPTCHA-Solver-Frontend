import React, { useState, useEffect, useCallback, useRef} from "react";
import axios from "axios";
import { Card, Button, Input, Typography, Row, Col, Space, message } from "antd";
import { FaArrowRight, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const { Text } = Typography;
const iconCoins = {
  earned: 15, penalties: 10, referAndEarn: 25 
}
const Captcha = () => {
  const [captcha, setCaptcha] = useState("");
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(15);
  const [coins, setCoins] = useState(0);
 
  const intervalRef = useRef(null); // Ref to manage the interval

  // Function to fetch new CAPTCHA
  const fetchCaptcha = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/captcha");
      setCaptcha(response.data.captchaText);
      setAnswer("");
      setTimer(15); // Reset the timer
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current); // Stop timer at 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current); // Ensure no intervals are left running
    }
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [timer]);

  const fetchUserCoins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/coins");
      setCoins(response.data.coins);
    } catch (error) {
      console.error("Error fetching user's coin balance:", error);
    }
  };

  // Initial load of CAPTCHA and user's coin balance
  useEffect(() => {
 
    fetchUserCoins();
    fetchCaptcha(); // Fetch CAPTCHA once on mount
  }, [fetchCaptcha]);

  const handleSubmit = async () => {
    if (timer === 0) {
      message.error("Time's up! You cannot submit this CAPTCHA.");
      fetchCaptcha(); // Load a new CAPTCHA
      return;
    }

    if (!answer.trim()) {
      message.warning("Please enter the CAPTCHA!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/captcha/verify", {
        userAnswer: answer,
        captchaText: captcha,
      });
      if (response.data.success) {
        console.log("response.data.coins", response.data.coins);
        
        setCoins(response.data.coins);
      } else {
        console.log("response.data.coins", response.data.coins);
      
        setCoins(response.data.coins);
      }

      fetchCaptcha(); // Load a new CAPTCHA after submission
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
    }
  };

  const handleSkip = () => {
    clearInterval(intervalRef.current); // Clear current timer
    fetchCaptcha(); // Load a new CAPTCHA
  };


  return (
    <Card bordered style={{ maxWidth: 450, margin: "auto", textAlign: "center" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        
        {/* CAPTCHA Display */}
        <div>
          <Text
            strong
            style={{
              fontSize: "3rem",
              fontWeight : "bold",
              color: "black",
              background: "white",
              border : "3px solid whitesmoke",
              padding: "16px 16px",
              display: "inline-block",
              borderRadius: 10,
              width : "300px"
            }}
          >
            {captcha}
          </Text>
        
        </div>

        <Row gutter={16} style={{ marginTop: "0px" }}>
          <Col span={19} style={{ textAlign: "left" }}>
            <Text strong style={{ color: "Red" }}>Special Alpha Numeric Case Sensitive</Text>
          </Col>
          <Col span={5} style={{ textAlign: "center" }}>
            <div
              style={{
                backgroundColor: "darkblue",
                color: "white",
                padding: "0px 0px",
                borderRadius: "25px",
                fontSize: "1rem"
              }}
            >
              {timer}s
            </div>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "0px", width: "480px" , display: "flex", alignItems: "center"}}>
          <Col span={20}>
            <div
              style={{
                display: "flex",
                border: "3px solid #d9d9d9",
                borderRadius: "8px",
                padding: "5px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="Enter CAPTCHA"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  border: "none",
                  padding: "8px 0px",
                  flex: 1,
                  borderRadius: "8px 8px 8px 8px", // rounded left corners
                }}
              />
              <Button
                onClick={handleSkip}
                style={{
                  backgroundColor: "darkblue",
                  marginLeft: "8px",
                  color : "white",
                  borderRadius: "25px",
                  paddingLeft: "30px",
                  paddingRight: "30px"
                }}
              >
                Skip
              </Button>
            </div>
          </Col>
        </Row>

       {/* Submit Button and Refer & Earn Circle Section */}
<Row gutter={16} style={{ margin : 0,  display: "flex", alignItems: "center" }}>
  {/* Centered Submit Button */}
  <Col span={18} style={{ display: "flex", justifyContent: "center" }}>
    <Button
      type="primary"
      onClick={handleSubmit}
      block
      style={{
        backgroundColor: "darkblue",
        color: "white",
        borderRadius: "25px",
        width: "30%", 
        marginLeft : "70px"
      }}
    >
      Submit
    </Button>
  </Col>



{/* Refer & Earn Circle Section */}
<Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
  <div
    style={{
      backgroundColor: "darkblue",
      color: "white",
      borderRadius: "60%", 
      padding: "8px 15px", 
      display: "flex",
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
    }}
  >
    <Text
      style={{
        textTransform: "uppercase",
        display: "block",
        textAlign: "center",
        margin: 0,
        lineHeight: "1", // Ensures no extra margin between lines
      }}
    >
      <span style={{ color: "white", fontSize: "10px", display : "flex", justifyContent : "center", alignItems : "center" }}>Refer</span>
      <span style={{ color: "white", fontSize: "10px" , display : "flex", justifyContent : "center", alignItems : "center"}}>&</span>
      <span style={{ color: "red", fontSize: "10px",  display : "flex", justifyContent : "center", alignItems : "center" }}>Earn</span>
    </Text>
  </div>
</Col>


</Row>
  {/* Total Coin Balance Display */}
  <Row gutter={16} justify="center" style={{ marginTop: "0px", padding : 0 }}>
          <Col>
            <div
              style={{
                border: "2px solid whitesmoke",
                borderRadius: "8px",
                padding: "0px",
                textAlign: "center",
                boxShadow: "0 2px 8px #fff",
                width: "180px",
              }}
            >
              <Text strong>
                User Coins Balance:{" "}
                <span style={{ color: "#1890ff", fontSize: "1.2rem" }}>{coins}</span>
              </Text>
            </div>
          </Col>
        </Row>

        <Row gutter={16} justify="center" style={{ marginTop: "0px" }}>
          <Col>
            <div
              style={{
                border: "2px solid whitesmoke",
                borderRadius: "8px",
                padding: "6px",
                textAlign: "center",
                width: "80px",
              }}
            >
              <Text strong>
                <FaArrowRight style={{ color: "#1890ff", fontSize: "1.0rem", marginRight: "5px" }} />
                {iconCoins.earned}
              </Text>
            </div>
          </Col>
          <Col>
            <div
              style={{
                border: "2px solid whitesmoke",
                borderRadius: "8px",
                padding: "6px",
                textAlign: "center",
                width: "80px",
              }}
            >
              <Text strong>
                <FaTimesCircle style={{ color: "red", fontSize: "1.0rem", marginRight: "5px" }} />
                {iconCoins.penalties}
              </Text>
            </div>
          </Col>
          <Col>
            <div
              style={{
                border: "2px solid whitesmoke",
                borderRadius: "8px",
                padding: "6px",
                textAlign: "center",
                width: "80px",
              }}
            >
              <Text strong>
                <FaCheckCircle style={{ color: "green", fontSize: "1.0rem", marginRight: "5px" }} />
                {iconCoins.referAndEarn}
              </Text>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: "center", marginTop: "8px" }}>
  <Button
    type="primary"
    style={{
      backgroundColor: "darkblue",
      color: "white",
      borderRadius: "25px",
      padding: "10px 20px",
      fontSize: "1rem",
      width: "180px",
    }}
  >
    Refer & Earn
  </Button>
</div>
        <div style={{ marginTop: 4, textAlign: "left" }}>
          <Text type="secondary">
            <p>* All words are case sensitive.</p>
            <p>* Calculative Captchas must be solved.</p>
            <p>* Length of Captchas will be between 6 to 12 characters.</p>
            <p>* The result can also be negative numbers, e.g., (5 - 8 = -3).</p>
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default Captcha;
