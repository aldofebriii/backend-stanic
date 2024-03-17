import fs from 'fs';

//Menggunakan fetch (kalau menggunakan https nanti2 saja)
const downloadFilePdfById = async (id) => {
    try {
        //Kalau pakai Fetch <BEGINNING>
        console.log("Mulai Download.. " + id);
        const res = await fetch("https://setpp.kemenkeu.go.id/risalah/ambilFileDariDisk/" + id, {
            method: 'GET',
            headers: {
                'Connection': 'keep-alive',
                'User-Agent' :'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0'
            }
        });
        //Check jika response OK
        if(res.ok) {
            //Convert Response
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            fs.writeFileSync('./file/' + id + '.pdf', buffer); //Fungsi untuk menulis secara sinkronus. menerima argument tempat dimana file 
            console.log("Selesai Download.. " + id);
            return "Finish " + id
        };
        
        //Kalau pakai Fetch <Ending>
    
        //Kalau pakai https (hiraukan) <BEGINNING>
        // return new Promise((resolve, reject) => {
        //     https.get({
        //         host: 'setpp.kemenkeu.go.id',
        //         path: '/risalah/ambilFileDariDisk/' + id,
        //         headers: {
        //             'Connection': 'keep-alive',
        //             'User-Agent' :'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0'
        //         }
        //     }, (res) => {
        //         console.log("Downloading... " + id);
        //         const ws = fs.createWriteStream('./file/' + id + '.pdf');
        //         res.pipe(ws);
        //         ws.on('finish', () =>{
        //             console.log("Finish Downloading " + id);
        //             resolve(("finished"));
        //         }).on('error', (err) => {
        //             fs.unlink('./file/' + id + '.pdf');
        //             reject(err.message);
        //         })
        //     })
        // })
        //Kalau Pakai https <ENDING>
    } catch(err) {
        console.log(err);
    }
};

const scrapPengadilanPajak = async (banyakHalaman) => {
    //Async function sudah sewajarnya dibalut dengan try{} dan catch(err){} (tinggal pindahin code kalian kedalam try {})
    try {
        //Membuat tempat penyimpanan data
        const penyimpanan =[];
        //Loop Halaman dari Halaman satu hingga halaman 3
        for(let halaman = 1; halaman <=banyakHalaman; halaman++) {
            //Ini Pakai backtis ` bukan kutip (disebelah angka 1 keyboard), https://www.w3schools.com/js/js_string_templates.asp (penjelasan)
            const URL_DATA = `https://setpp.kemenkeu.go.id/risalah/Putusan_Read?sort=id-desc&page=${halaman}&pageSize=50&group=&filter=`;
            //Tarik Data Per Halaman,
            //Penjelasan fungsi fetch : https://developer.mozilla.org/en-US/docs/Web/API/fetch
            const res = await fetch(URL_DATA, {
                method: 'POST',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
                    'Connection': 'keep-alive',
                    'Content-Length': 46
                }
            })
            //Convert data Response ke Data JSON
            const rawData = await res.json();
            const data = rawData.Data;
            //Loop terhadap data mentah dari pengadilan pajak
            for(let i =0 ; i < data.length; i++) {
                const putusan = data[i];
                //Filter  putusan dengan absris tarif
                if(putusan.absris === 'Gugatan Pajak') {
                    //Memasukan data menggunkana metode push
                    penyimpanan.push(putusan);
                };
            };
            //Loop terhadap data penyimpanan ()
            for(let putusan of penyimpanan) {
                const putusanId = putusan.id;
                await downloadFilePdfById(putusanId);
            };
            console.log("Ending Downloading Page ..." + halaman);
        };
        console.log("Seluruh Scrapping berhasil dilakukan dengan total file " + penyimpanan.length)
    } catch(err) {
        console.log(err);
    }
};

scrapPengadilanPajak(3);
