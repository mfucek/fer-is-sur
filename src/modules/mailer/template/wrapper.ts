export const wrapper = (...children: string[]) => {
	return `<!--
	* This email was built using Tabular.
	* For more information, visit https://tabular.email
	-->

	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

	<html
		xmlns="http://www.w3.org/1999/xhtml"
		xmlns:v="urn:schemas-microsoft-com:vml"
		xmlns:o="urn:schemas-microsoft-com:office:office"
		lang="en"
	>
		<head>
			<title></title>
			<meta charset="UTF-8" />
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			<!--[if !mso]>-->
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<!--<![endif]-->
			<meta name="x-apple-disable-message-reformatting" content="" />
			<meta content="target-densitydpi=device-dpi" name="viewport" />
			<meta content="true" name="HandheldFriendly" />
			<meta content="width=device-width" name="viewport" />
			<meta
				name="format-detection"
				content="telephone=no, date=no, address=no, email=no, url=no"
			/>
			<style type="text/css">
				table {
					border-collapse: separate;
					table-layout: fixed;
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
				}
				table td {
					border-collapse: collapse;
				}
				.ExternalClass {
					width: 100%;
				}
				.ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
				}
				body,
				a,
				li,
				p,
				h1,
				h2,
				h3 {
					-ms-text-size-adjust: 100%;
					-webkit-text-size-adjust: 100%;
				}
				html {
					-webkit-text-size-adjust: none !important;
				}
				body,
				#innerTable {
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
				#innerTable img + div {
					display: none;
					display: none !important;
				}
				img {
					margin: 0;
					padding: 0;
					-ms-interpolation-mode: bicubic;
				}
				h1,
				h2,
				h3,
				p,
				a {
					line-height: inherit;
					overflow-wrap: normal;
					white-space: normal;
					word-break: break-word;
				}
				a {
					text-decoration: none;
				}
				h1,
				h2,
				h3,
				p {
					min-width: 100% !important;
					width: 100% !important;
					max-width: 100% !important;
					display: inline-block !important;
					border: 0;
					padding: 0;
					margin: 0;
				}
				a[x-apple-data-detectors] {
					color: inherit !important;
					text-decoration: none !important;
					font-size: inherit !important;
					font-family: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
				}
				u + #body a {
					color: inherit;
					text-decoration: none;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					line-height: inherit;
				}
				a[href^='mailto'],
				a[href^='tel'],
				a[href^='sms'] {
					color: inherit;
					text-decoration: none;
				}
			</style>
			<style type="text/css">
				@media (min-width: 481px) {
					.hd {
						display: none !important;
					}
				}
			</style>
			<style type="text/css">
				@media (max-width: 480px) {
					.hm {
						display: none !important;
					}
				}
			</style>
			<style type="text/css">
				@media (max-width: 480px) {
					.t14,
					.t177,
					.t192,
					.t29 {
						vertical-align: middle !important;
					}
					.t446 {
						mso-line-height-alt: 24px !important;
						line-height: 24px !important;
					}
					.t447 {
						padding-left: 8px !important;
						padding-right: 8px !important;
					}
					.t38 {
						padding-top: 24px !important;
						padding-bottom: 24px !important;
					}
					.t118,
					.t207,
					.t273,
					.t339,
					.t34,
					.t405,
					.t43 {
						padding-left: 24px !important;
						padding-right: 24px !important;
					}
					.t109,
					.t193,
					.t244,
					.t260,
					.t30,
					.t310,
					.t326,
					.t376,
					.t392,
					.t64,
					.t89 {
						text-align: left !important;
					}
					.t12,
					.t175,
					.t213,
					.t279,
					.t345 {
						display: revert !important;
					}
					.t14,
					.t177 {
						width: 624px !important;
					}
					.t11,
					.t174 {
						padding-right: 24px !important;
					}
					.t165,
					.t167,
					.t2,
					.t4 {
						max-width: 210.2px !important;
					}
					.t18,
					.t181,
					.t183,
					.t187,
					.t189,
					.t20,
					.t24,
					.t26 {
						max-width: 156.8px !important;
					}
					.t170,
					.t7 {
						padding-bottom: 20px !important;
					}
					.t168,
					.t5 {
						line-height: 28px !important;
						font-size: 26px !important;
						letter-spacing: -1.04px !important;
					}
					.t192,
					.t29 {
						width: 400px !important;
					}
					.t18,
					.t181,
					.t182,
					.t187,
					.t188,
					.t19,
					.t24,
					.t25 {
						width: auto !important;
					}
					.t158,
					.t201,
					.t409,
					.t441 {
						mso-line-height-alt: 8px !important;
						line-height: 8px !important;
					}
					.t117,
					.t153 {
						mso-line-height-alt: 12px !important;
						line-height: 12px !important;
					}
					.t239,
					.t259,
					.t305,
					.t325,
					.t371,
					.t391,
					.t59,
					.t63,
					.t84,
					.t88 {
						vertical-align: middle !important;
						width: 600px !important;
					}
					.t104,
					.t108 {
						vertical-align: top !important;
						width: 600px !important;
					}
					.t149,
					.t197,
					.t442 {
						padding: 24px !important;
					}
					.t151 {
						background-color: #fff !important;
					}
					.t141,
					.t143 {
						max-width: 392px !important;
					}
					.t139 {
						font-family:
							Nunito Sans,
							BlinkMacSystemFont,
							Segoe UI,
							Helvetica Neue,
							Arial,
							sans-serif !important;
					}
					.t202 {
						padding-top: 0 !important;
						padding-bottom: 0 !important;
					}
					.t410 {
						padding-bottom: 24px !important;
					}
					.t215,
					.t281,
					.t347 {
						vertical-align: middle !important;
						width: 344px !important;
					}
					.t237,
					.t303,
					.t369 {
						padding-bottom: 12px !important;
						padding-right: 0 !important;
					}
					.t227,
					.t293,
					.t359 {
						font-weight: 500 !important;
					}
				}
			</style>
			<!--[if !mso]>-->
			<link
				href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;700;800&amp;family=Albert+Sans:wght@500;700;800&amp;family=Inter+Tight:wght@700&amp;display=swap"
				rel="stylesheet"
				type="text/css"
			/>
			<!--<![endif]-->
			<!--[if mso]>
				<xml>
					<o:OfficeDocumentSettings>
						<o:AllowPNG />
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
			<![endif]-->
		</head>

		<body
			id="body"
			class="t453"
			style="
				min-width: 100%;
				margin: 0px;
				padding: 0px;
				background-color: #f9f9f9;
			"
		>
			<div class="t452" style="background-color: #f9f9f9">
				<table
					role="presentation"
					width="100%"
					cellpadding="0"
					cellspacing="0"
					border="0"
					align="center"
				>
					<tr>
						<td
							class="t451"
							style="
								font-size: 0;
								line-height: 0;
								mso-line-height-rule: exactly;
								background-color: #f9f9f9;
							"
							valign="top"
							align="center"
						>
							<!--[if mso]>
								<v:background
									xmlns:v="urn:schemas-microsoft-com:vml"
									fill="true"
									stroke="false"
								>
									<v:fill color="#F9F9F9" />
								</v:background>
							<![endif]-->
							<table
								role="presentation"
								width="100%"
								cellpadding="0"
								cellspacing="0"
								border="0"
								align="center"
								id="innerTable"
							>
								<tr>
									<td>
										<div
											class="t446"
											style="
												mso-line-height-rule: exactly;
												mso-line-height-alt: 64px;
												line-height: 64px;
												font-size: 1px;
												display: block;
											"
										>
											&nbsp;&nbsp;
										</div>
									</td>
								</tr>
								<tr>
									<td align="center">
										<table
											class="t450"
											role="presentation"
											cellpadding="0"
											cellspacing="0"
											style="margin-left: auto; margin-right: auto"
										>
											<tr>
												<td width="640" class="t449" style="width: 640px">
													<table
														class="t448"
														role="presentation"
														cellpadding="0"
														cellspacing="0"
														width="100%"
														style="width: 100%"
													>
														<tr>
															<td class="t447" style="padding: 0 24px 0 24px">
																<table
																	role="presentation"
																	width="100%"
																	cellpadding="0"
																	cellspacing="0"
																	style="width: 100% !important"
																>
																	

																	${children.join('\n')}



																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
			<div
				class="gmail-fix"
				style="
					display: none;
					white-space: nowrap;
					font: 15px courier;
					line-height: 0;
				"
			>
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			</div>
		</body>
	</html>
	`;
};
