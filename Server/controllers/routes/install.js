/*
** '/install' route
*/

module.exports = {
    POST: function (req, res)
        {
            if (req.body.packages)
            {
                rec(req.body.packages, 0);

                function rec(packages, key)
                {
                    if (packages[key] === undefined)
                    {
                        res.end(JSON.stringify(packages));
                    }
                    else
                    {
                        CheckVersion(packages[key].name, packages[key].version,
                            function(is_exists, version = '') {
                                if (is_exists)
                                {
                                    packages[key].url = '/packages/' + packages[key].name
                                        + '/' + packages[key].name + '_' + version + '.orig.tar.xz';
                                }
                                rec(packages, key+1);
                            });
                    }
                };
            }
            else
            {
                res.sendStatus(403);
            }
        }
}

