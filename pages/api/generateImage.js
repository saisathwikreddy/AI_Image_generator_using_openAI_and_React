// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration)
const generateImage = async (req, res) => {
    const { prompt, size } = req.body;
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
        });
        let image_url = response.data.data[0].url;

        res.status(200).json({ image: image_url })
    }
    catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated',
        });
    }
}
export default generateImage