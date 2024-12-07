// BuyPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const BuyPage = () => {
    const { propertyId } = useParams(); // Get the property ID from the URL params
    const [showQR, setShowQR] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cvv: "",
        expiryDate: "",
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [transactionMessage, setTransactionMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTransactionComplete, setIsTransactionComplete] = useState(false);

    const handleGenerateQR = () => {
        setShowQR(true);
        setSelectedPaymentMethod(null);
        setIsTransactionComplete(false);
        setTransactionMessage("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setShowQR(false);
        setTransactionMessage("");
        setIsTransactionComplete(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setTransactionMessage("Your transaction has been successfully completed!");
            setIsProcessing(false);
            setIsTransactionComplete(true);
            setCardDetails({ cardNumber: "", cvv: "", expiryDate: "" });
        }, 2000);
    };

    const qrData = `Property ID: ${propertyId}, Card Number: ${cardDetails.cardNumber}, CVV: ${cardDetails.cvv}, Expiry: ${cardDetails.expiryDate}`;

    return (
        <div style={styles.container}>
            <h2>Payment Options for Property {propertyId}</h2>
            <div style={styles.buttonGroup}>
                <button style={styles.qrButton} onClick={handleGenerateQR}>
                    Generate QR
                </button>
                <button
                    style={styles.cardButton}
                    onClick={() => handlePaymentMethodSelect("credit")}
                    disabled={isTransactionComplete}
                >
                    Credit Card
                </button>
                <button
                    style={styles.cardButton}
                    onClick={() => handlePaymentMethodSelect("debit")}
                    disabled={isTransactionComplete}
                >
                    Debit Card
                </button>
            </div>
            {showQR && !selectedPaymentMethod && (
                <div style={styles.qrCode}>
                    <QRCodeCanvas value={qrData} size={256} />
                </div>
            )}
            {selectedPaymentMethod && !isTransactionComplete && (
                <form style={styles.cardForm} onSubmit={handleSubmit}>
                    <h3>Enter Card Details ({selectedPaymentMethod} Card)</h3>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (16 digits)"
                        value={cardDetails.cardNumber}
                        maxLength="16"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="cvv"
                        placeholder="CVV (3 digits)"
                        value={cardDetails.cvv}
                        maxLength="3"
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YYYY)"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                    />
                    <button type="submit" style={styles.submitButton} disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Submit"}
                    </button>
                </form>
            )}

            {transactionMessage && (
                <div style={styles.successMessage}>
                    <p>{transactionMessage}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        margin: "20px 0",
    },
    qrButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    cardButton: {
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    qrCode: {
        marginTop: "20px",
        border: "1px solid #ccc",
        padding: "50px",
        borderRadius: "5px",
        display: "inline-block",
    },
    cardForm: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    successMessage: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#28a745",
        color: "white",
        borderRadius: "5px",
        fontSize: "18px",
        animation: "fadeIn 2s",
    },
};

export default BuyPage;
