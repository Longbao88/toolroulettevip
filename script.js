
document.addEventListener('DOMContentLoaded', function() {
    let countdownTime = 30; // Thời gian đếm ngược (30 giây)
    let countdownDisplay = document.getElementById('countdown'); // Phần hiển thị đếm ngược
    let analysisStatus = document.getElementById('analysisStatus'); // Phần hiển thị trạng thái phân tích

    // Hiển thị "VÁN TIẾP THEO SAU" trước khi đếm ngược
    countdownDisplay.textContent = "VÁN TIẾP THEO SAU";

    // Cập nhật đếm ngược mỗi giây
    let countdownInterval = setInterval(function() {
        analysisStatus.textContent = "ĐANG PHÂN TÍCH"; // Hiển thị "ĐANG PHÂN TÍCH" trong khi đếm ngược
        countdownDisplay.textContent = countdownTime + " giây";
        countdownTime--;

        if (countdownTime < 0) {
            clearInterval(countdownInterval); // Dừng đếm ngược khi hết 30 giây
            analysisStatus.textContent = "ĐÃ PHÂN TÍCH XONG"; // Hiển thị khi phân tích xong
            countdownDisplay.textContent = "Đang quay..."; // Hiển thị khi bắt đầu quay
            setTimeout(startSpin, 1000); // Bắt đầu quay sau 1 giây
        }
    }, 1000); // Đếm ngược mỗi giây

    // Quay vòng liên tục mỗi 30 giây
    setInterval(function() {
        startSpin();
    }, 30000);

    function startSpin() {
        // Tạo 12 số ngẫu nhiên từ 0 đến 34 không trùng lặp
        let randomNumbers = [];
        while (randomNumbers.length < 12) {
            let randomNumber = Math.floor(Math.random() * 35);
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }

        // Tính tổng của 12 số ngẫu nhiên để dự đoán chẵn hay lẻ
        let total = randomNumbers.reduce((acc, num) => acc + num, 0);
        let evenOdd = total % 2 === 0 ? "Chẵn" : "Lẻ"; // Dự đoán dựa trên tổng của các số

        // Hiển thị 12 số ngẫu nhiên lên giao diện và dự đoán chẵn hoặc lẻ
        document.getElementById('randomNumber').textContent = randomNumbers.join(", ");
        document.getElementById('evenOdd').textContent = evenOdd;
        
        // Quay vòng
        spinWheel(randomNumbers);
    }

    function spinWheel(numbers) {
        let canvas = document.getElementById('rouletteWheel');
        let ctx = canvas.getContext('2d');

        let numSections = 35;  // Tổng số phần (0 - 34)
        let angle = (2 * Math.PI) / numSections;
        let rotationAngle = (Math.random() * 2 * Math.PI) + (Math.PI / 2); // Khởi tạo góc quay ngẫu nhiên

        // Vẽ vòng quay
        for (let i = 0; i < numSections; i++) {
            ctx.beginPath();
            ctx.moveTo(250, 250);
            ctx.arc(250, 250, 200, angle * i, angle * (i + 1));
            ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';  // Vẽ xen kẽ các màu
            ctx.fill();
            ctx.stroke();
        }

        // Quay vòng quay
        let spinTime = 3;
        let currentAngle = rotationAngle;
        let spinSpeed = 0.1;

        function rotateWheel() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Xóa màn hình
            for (let i = 0; i < numSections; i++) {
                ctx.beginPath();
                ctx.moveTo(250, 250);
                ctx.arc(250, 250, 200, angle * i + currentAngle, angle * (i + 1) + currentAngle);
                ctx.fillStyle = i % 2 === 0 ? '#ff0000' : '#00ff00';
                ctx.fill();
                ctx.stroke();
            }

            currentAngle += spinSpeed;
            if (spinTime > 0) {
                spinSpeed *= 1.02;  // Tăng tốc độ quay dần
                spinTime -= 0.05;
                requestAnimationFrame(rotateWheel);  // Lặp lại
            } else {
                displayResult(numbers);  // Hiển thị kết quả sau khi quay
            }
        }

        rotateWheel();
    }

    function displayResult(numbers) {
        console.log("12 số dự đoán: " + numbers.join(", "));
    }
});
