var HCard = Microformat.define('vcard', {
  one : ['bday', 'tz', 'sort-string', 'uid', 'class', {
    'n' : {
      one : ['family-name', 'given-name', 'additional-name'],
      many : ['honorific-prefix', 'honorific-suffix']
    },
    'geo' : function(node) {
      var m;
      if ((node.nodeName.toLowerCase() == 'abbr') && (m = node.title.match(/^([\-\d\.]+);([\-\d\.]+)$/))) {
        return { latitude : m[1], longitude : m[2] };
      }
      
      return this._extractData(node, { one : ['latitude', 'longitude'] });
    },
    // implied n
    'fn' : function(node, data) {
      var m, fn = this._extractData(node, 'simple');
      
      if (m = fn.match(/^(\w+) (\w+)$/)) {
        data.n = data.n || {};
        data.n['given-name'] = data.n['given-name'] || m[1];
        data.n['family-name'] = data.n['family-name'] || m[2];
      } else if (m = fn.match(/^(\w+),? (\w+)\.?$/)) {
        data.n = data.n || {};
        data.n['given-name'] = data.n['given-name'] || m[2];
        data.n['family-name'] = data.n['family-name'] || m[1];
      }
      
      return fn;
    }
  }],
  many : ['label', 'sound', 'title', 'role', 'key', 'mailer', 'rev', 'nickname', 'category', 'note', 'tel', { 
      'url' : 'url', 'logo' : 'url', 'photo' : 'url', 'email' : 'url' 
    }, {
    'adr' : {
      one : ['post-office-box', 'extended-address', 'street-address', 'locality', 'region',
             'postal-code', 'country-name']
    },
    // implied org
    'org' : function(node) {
      var org = this._extractData(node, {
        one : ['organization-name'],
        many : ['organization-unit']
      });
      
      if (!org.organizationName) 
        org['organization-name'] = this._extractData(node, 'simple');
        
      return org;
    }
  }]
});
