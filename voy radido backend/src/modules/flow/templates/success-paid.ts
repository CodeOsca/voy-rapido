export const successPaid = (link: string) => `
<!doctype html>
<html lang="es-ES">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Voy Rápido</title>
    <meta name="description" content="Volver a voy rápido">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
    <script>
        window.location.replace("${link}")
    </script>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #fff;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#fff">
        <tr>
            <td>
                <table style="background-color: #F26133; width:100vw;  margin:0 auto;" border="0" height="100vh"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>

                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="background:#F26133; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">

                                        <a href="${link}tienda"
                                            style="background:#fff;text-decoration:none !important; font-weight:700; margin-top:35px; color:#F26133;text-transform:uppercase; font-size:32px;padding:10px 24px;display:inline-block;border-radius:50px;">Volver al sistema</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a style="font-size:14px; color:#fff; line-height:18px; margin:0 0 0;" href="http://voyrapido.cl/">&copy; <strong>voyrapido.cl</strong></a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>
`;
