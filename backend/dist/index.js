"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('✅ Підключено до MongoDB Atlas');
    app.listen(port, () => {
        console.log(`🚀 Сервер слухає на http://localhost:${port}`);
    });
})
    .catch(err => {
    console.error('❌ Помилка підключення до MongoDB:', err);
});
