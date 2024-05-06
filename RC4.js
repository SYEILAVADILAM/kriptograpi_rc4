(() => {
    function rc4_encode(key, str) {
      var s = [], j = 0, x, res = '';
      for (var i = 0; i < 255; i++) {
        s[i] = i;
      }
  
      for (i = 0; i < 255; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 255;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }
      i = 0;
      j = 0;
      for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 255;
        j = (j + s[i]) % 255;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 255]);
      }
      text = new TextEncoder().encode(res);
      array = new Uint8Array(text, 0, 5);
      array_ = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('');
      console.log(array_);
  
      return array_;
    }
  
    function rc4_decode(key, str) {
      let bytes = new Uint8Array(str.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
      let text = new TextDecoder().decode(bytes);
      var s = [], j = 0, x, res = '';
      for (var i = 0; i < 255; i++) {
        s[i] = i;
      }
  
      for (i = 0; i < 255; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 255;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }
      i = 0;
      j = 0;
      for (var y = 0; y < text.length; y++) {
        i = (i + 1) % 255;
        j = (j + s[i]) % 255;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(text.charCodeAt(y) ^ s[(s[i] + s[j]) % 255]);
      }
  
      return res;
    }
  
    String.prototype.hexEncode = function () {
      var hex, i;
  
      var result = "";
      for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
      }
  
      return result
    }
  
    const encrypt_button = document.getElementById('encrypt_button');
    encrypt_button.addEventListener('click', () => {
      var key = document.getElementById('encryptkey').value;
      var plaintext = document.getElementById('messageToEncrypt').value;
      var ciphertext = rc4_encode(key, plaintext);
      document.getElementById('encryptedText').value = ciphertext;
    });
  
    const decrypt_button = document.getElementById('decrypt_button');
    decrypt_button.addEventListener('click', () => {
      var key = document.getElementById('decryptkey').value;
      var plaintext = document.getElementById('messageTodecrypt').value;
      var ciphertext = rc4_decode(key, plaintext);
      document.getElementById('decryptedText').value = ciphertext;
    });
  })();
  