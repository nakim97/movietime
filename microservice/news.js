// To scrape news articles of IMDB 

const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');

//
var express = require('express');
var app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const fetchNews = async () => {
	try {
        const response = await axios.get('https://www.imdb.com/news/movie');

        const html = response.data;

		const $ = cheerio.load(html);

        const results = [];

        $('h2 > a').each((i, el) => {
            var object = {title: null, date: null, writer: null, magazine: null, 
                body: null, img: null, larger_img: null, link: null}

            const news_title = $(el).text().replace(/\n/g,'')
            object['title'] = news_title
            
            // Get date of article 
            const date = $(el).parent().next().children().first().text().replace(/\n/g,'')
            object['date'] = date

            // Get writer 
            const writer = $(el).parent().next().children().eq(1).text().replace(/\n/g,'')
            object['writer'] = writer

            // Get magazine or source 
            const magazine = $(el).parent().next().children().eq(2).text().replace(/\n/g,'')
            object['magazine'] = magazine

            // Get body of article 
            const body = $(el).parent().parent().next().text().replace(/\n/g,'')
            object['body'] = body

            // Get img url 1x 
            const img1 = $(el).parent().parent().next().find('img').attr('src')
            object['img'] = img1

            // Get img url 2x, 3x 
            const img2 = $(el).parent().parent().next().find('img').attr('srcset')
            object['larger_img'] = img2

            // Get link to article 
            const link = $(el).parent().parent().find('a').attr('href')
            object['link'] = link

            results.push(object);
        })


        app.get('/imdbnews', function(req, res) {
            console.log(results);

            res.json({"results": results})
        })
        
            console.log(results);

        return results;

	} catch (error) {
		throw error;
	}
};

fetchNews().then((results) => console.log(results));

app.listen(5000, () => console.log(`Server started on 5000`));