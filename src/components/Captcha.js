import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Typography, Input, Button} from "antd";
import { DoubleRightOutlined } from '@ant-design/icons';

import { FaArrowRight, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import "./Captcha.css"
const { Text } = Typography;

const Captcha = () => {
  const [captcha, setCaptcha] = useState("");
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(15);
  const [coins, setCoins] = useState(0);

  const intervalRef = useRef(null); // Ref to manage the interval

  // Function to fetch new CAPTCHA
  const fetchCaptcha = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/captcha`);
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
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/coins`);
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
      alert("Time's up! You cannot submit this CAPTCHA.");
      fetchCaptcha(); // Load a new CAPTCHA
      return;
    }

    if (!answer.trim()) {
      alert("Please enter the CAPTCHA!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/captcha/verify`, {
        userAnswer: answer,
        captchaText: captcha,
      });
      setCoins(response.data.coins);
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
    <div className="captcha-container">
      <div className="captcha-card">
        <div className="captcha-display">
        <span class="rotated-text">{captcha}</span></div>
        <div className="captcha-info">
          <span className="captcha-note">Special Alpha Numeric Case Sensitive</span>
          <div className="captcha-timer">{timer}s</div>
        </div>
        <div
              style={{
                display: "flex",
                border: "3px solid #d9d9d9",
                borderRadius: "8px",
                padding: "5px",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom : "10px"
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

        <div className="actions">
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
          <div className="refer-circle">
            <span>REFER</span>
            <span>&</span>
            <span style={{color : "red"}}>EARN</span>
          </div>
        </div>
        <div className="user-coins">
          User Coins Balance: <span>{coins}</span>
        </div>
        <div className="icon-section">
          <div className="icon-item">
          <DoubleRightOutlined style={{ fontWeight : "bold", color: "#FFF", fontSize: "15px" , backgroundColor: "#1890ff", borderRadius: "50%", padding : "3px" }} />
          <span style={{marginLeft : "5px"}}>15</span>
          </div>
          <div className="icon-item">
            <FaTimesCircle style={{color: "red", fontSize : "20px"}} />
            <span style={{marginLeft : "5px"}}>10</span>
          </div>
          <div className="icon-item">
            <FaCheckCircle style={ {color: "green", fontSize : "20px"}} />
            <span style={{marginLeft : "5px"}}>25</span>
          </div>
        </div>
        <button className="refer-btn">Refer & Earn</button>
        <div style={{ marginTop: 0, textAlign: "left" }}>

        <Text type="secondary">
            <p>* All words are case sensitive.</p>
            <p>* Calculative Captchas must be solved.</p>
            <p>* Length of Captchas will be between 6 to 12 characters.</p>
            <p>* The result can also be negative numbers, e.g., (5 - 8 = -3).</p>
          </Text>
</div>
      </div>
    </div>
  );
};

export default Captcha;
