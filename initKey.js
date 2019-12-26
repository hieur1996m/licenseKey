function lc(c, useLicenseName) {
    var i;
    var map = [1, 8, 17, 22, 3, 13, 11, 20, 5, 24, 27];
    var key = '*???-*?**-?**?-*?**-*?**-?*?*-?**?'.replace(/-/g, '').split('');
    if (useLicenseName) {
        var lc2Map = [1, 2, 6, 7, 11, 12, 16, 17, 21, 22, 26, 27, 31, 32];
        var lc2Pos = Math.floor(lc2Map.length * Math.random());
        key[2] = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('')[lc2Pos];
    }
    for (i = 0; i < map.length; ++i) {
        key[map[i]] = c[i];
    }
    var result = [];
    for (i = 0; i < key.length; i += 4) {
        var result_part = '';
        for (var j = i; j < i + 4 && j < key.length; ++j) {
            result_part += key[j];
        }
        result.push(result_part);
    }
    return result.join('-');
}
function c(f) {
    var map = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < f.length; ++i) {
        result += map[f[i]];
    }
    return result;
}
function f10(c) {
    var i;
    var tmp = 0;
    for (i = 0; i < 10; ++i) {
        tmp += c.charCodeAt(i);
    }
    while (tmp > 33) {
        var tmp1 = tmp.toString().split('');
        tmp = 0;
        for (i = 0; i < tmp1.length; ++i) {
            tmp += parseInt(tmp1[i]);
        }
    }
    return tmp;
}
function f4(f0, licenseType) {
    return (f0 + licenseType) % 33;
}
function f7(licenseName) {
    var tmp = 0;
    for (var i = 0; i < licenseName.length; ++i) {
        tmp += licenseName.charCodeAt(i);
    }
    return tmp % 100 % 33;
}
function f5(f1, arg1) {
    arg1 = arg1 ? 1 : 0;
    return (f1 + arg1) % 33;
}
function f8f9(f0, f1, f2, f3) {
    var c = 33 + (f0 * f3 - f1 * f2) % 33;
    var u = 0;
    for (var i = 0; i < 33; ++i) {
        if (1 === c * i % 33) {
            u = i;
        }
    }
    var _f1 = 33 - f1, _f2 = 33 - f2;
    for (var f8 = 0; f8 < 33; ++f8) {
        for (var f9 = 0; f9 < 33; ++f9) {
            if (12 * ((u * f3 % 33 * f8 + u * _f1 % 33 * f9) % 33) + (u * _f2 % 33 * f8 + u * f0 % 33 * f9) % 33 >= 211) {
                return [f8, f9];
            }
        }
    }
    return null;
}
function rand33() {
    return Math.floor(33 * Math.random());
}
function generateLicenseKey(licenseType, licenseName) {
    licenseType = parseInt(licenseType);
    licenseType = ([0, 1, 2, 3].indexOf(licenseType) < 0) ? 2 : licenseType;
    licenseName = licenseName || '';
    var f = [];
    var f8f9Pair = null;
    var i = 0;
    do {
        f[0] = rand33();
        f[1] = rand33();
        f[2] = rand33();
        f[3] = rand33();
        f8f9Pair = f8f9(f[0], f[1], f[2], f[3]);
        ++i;
        if (i > 1000) {
            throw new Error('Generate license key error, there may be some problem with the random number generater of your computer.');
        }
    } while (!f8f9Pair);
    f[4] = f4(f[0], licenseType);
    f[5] = f5(f[1], Math.floor(2 * Math.random()));
    f[6] = rand33();
    f[7] = f7(licenseName);
    f[8] = f8f9Pair[0];
    f[9] = f8f9Pair[1];
    f[10] = f10(c(f));
    return lc(c(f), (licenseType !== 2));
}
function generate() {
    let licenseType = document.getElementById('licenseType').value;
    let licenseName = document.getElementById('licenseName').value;
    let licenseKey = generateLicenseKey(licenseType, licenseName);

    $.ajax({
        url: 'ajax/getKey.php',
        type: 'POST',
        data: {licenseKey:licenseKey,licenseName:licenseName},
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
}