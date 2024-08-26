const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

async function sendEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Você pode usar outro serviço de email
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmação de Cadastro',
    text: `Aqui está seu token de confirmação: ${token}`,
  };

  await transporter.sendMail(mailOptions);
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      token,
    });

    await sendEmail(email, token);

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso! Verifique seu email para confirmar.' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário', details: error.message });
  }
};
