import { Typography, Box, styled , Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";
const Component = styled(Box)`
    width: 80%%;
    height: 65vh;
    background: #fff;
    margin: 80px 140px;
`;

const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`;

const Image = styled('img')({
    width: '15%'
});


const SuccessPayment = () => {
    const navigate = useNavigate();
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    
    const toHome = () => {
        navigate('/');
    }

    
    
        // Helper function to convert image URL to base64
        const convertImgToBase64 = async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        };
    
        const downloadInvoice = async () => {
            const invoiceData = JSON.parse(localStorage.getItem("invoiceData"));
            
            if (!invoiceData) {
                alert("Invoice data not found.");
                return;
            }
    
            const { price, discount, deliveryCharges, totalAmount, items } = invoiceData;
            
            const doc = new jsPDF();
    
            // Header details with blue color
            doc.setFontSize(12);
            doc.setTextColor(0, 51, 153); // Dark blue color
            doc.text(`Order Number: OID84`, 20, 20);
            doc.text(`Invoice Number: INV-1234`, 150, 20, { align: "right" });
            doc.text(`Order Date: ${new Date().toLocaleDateString()}`, 20, 30);
    
            // Table headers and data
            const tableColumns = [
                { title: "Product", dataKey: "name" },
                { title: "Unit Price", dataKey: "mrp" },
                { title: "Tax Rate", dataKey: "taxRate" },
                { title: "Tax Amt", dataKey: "taxAmt" },
                { title: "Total", dataKey: "total" }
            ];
    
            const tableRows = items.map(item => {
                const taxRate = item.discount; // Example tax rate (you can adjust per item or use dynamic values)
                const taxAmt = (item.cost * taxRate) / 100;
                const total = item.cost + taxAmt;
    
                return {
                    name: item.longTitle || item.name,
                    mrp: `₹${item.mrp}`, // Assuming quantity is 1 per item
                    taxRate: `${item.discount}`,
                    taxAmt: `₹${item.mrp-item.cost}`,
                    total: `₹${item.cost}`
                };
            });
    
            // Total price row
            tableRows.push({
                name: "Shipping",
                mrp: `₹${deliveryCharges}`,
                taxRate: "",
                taxAmt: "",
                total: `₹${deliveryCharges}`
            });
    
            // Add total amount row
            tableRows.push({
                name: "Total Price",
                mrp: "",
                taxRate: "",
                taxAmt: "",
                total: `₹${totalAmount}`
            });
    
            // Add table to PDF with custom styles
            doc.autoTable({
                head: [tableColumns.map(col => col.title)],
                body: tableRows.map(row => tableColumns.map(col => row[col.dataKey])),
                startY: 40,
                theme: "grid",
                styles: {
                    halign: "left",
                    fontSize: 10,
                },
                headStyles: {
                    fillColor: [0, 51, 153], // Blue header
                    textColor: [255, 255, 255], // White text in header
                    fontStyle: "bold"
                },
                bodyStyles: {
                    fillColor: [240, 248, 255], // Light blue for rows
                    textColor: [0, 0, 0]
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255] // White for alternating rows
                },
                margin: { top: 10 },
            });
            doc.text(`Thank you for shopping from CityShop!`, 20, 260);
            doc.text(`Enjoy your day!`, 20, 270);
            // Save the PDF
            doc.save("invoice.pdf");
        };

    return (
        <Component>
            <Container>
                <Image src={imgurl} />
                <Typography>Your Order is Successful!!</Typography>
                <Typography>Continue to Shopping.</Typography>
                <Button 
                    onClick={downloadInvoice} 
                    style={{ margin: '10px', background: '#ff9f00', color: 'white' }}
                >
                    Download Your Invoice
                </Button>

                <div style={{ marginTop: '10px' }}>
                    <Button 
                        onClick={toHome} 
                        style={{ width: 46, background: '#ff9f00', color: 'white' }}
                        variant="contained"
                    >
                        Home
                    </Button>
                </div>            
            </Container>
        </Component>
    );
}

export default SuccessPayment;