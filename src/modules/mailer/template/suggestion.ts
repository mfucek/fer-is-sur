import { differenceInDays, format as formatDate } from 'date-fns';

export const suggestion = ({
	title,
	location,
	date,
	remainingSpots,
	imgSrc,
	reservationUrl
}: {
	title: string;
	location: string;
	date: Date;
	remainingSpots: number;
	imgSrc: string;
	reservationUrl: string;
}) => {
	const daysUntilEvent = differenceInDays(date, new Date()) + 1;
	const daysUntilEventString =
		daysUntilEvent === 1 ? '1 dan' : `${daysUntilEvent} dana`;

	return `<tr>
		<td>
			<div
				class="t272"
				style="
					mso-line-height-rule: exactly;
					mso-line-height-alt: 24px;
					line-height: 24px;
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
				class="t276"
				role="presentation"
				cellpadding="0"
				cellspacing="0"
				style="
					margin-left: auto;
					margin-right: auto;
				"
			>
				<tr>
					<td
						width="592"
						class="t275"
						style="width: 600px"
					>
						<table
							class="t274"
							role="presentation"
							cellpadding="0"
							cellspacing="0"
							width="100%"
							style="
								width: 100%;
							"
						>
							<tr>
								<td
									class="t273"
									style="
										padding: 0
											40px 0
											40px;
									"
								>
									<table
										role="presentation"
										width="100%"
										cellpadding="0"
										cellspacing="0"
										style="
											width: 100% !important;
										"
									>
										<tr>
											<td
												align="center"
											>
												<table
													class="t271"
													role="presentation"
													cellpadding="0"
													cellspacing="0"
													style="
														margin-left: auto;
														margin-right: auto;
													"
												>
													<tr>
														<td
															width="512"
															class="t270"
															style="
																width: 600px;
															"
														>
															<table
																class="t269"
																role="presentation"
																cellpadding="0"
																cellspacing="0"
																width="100%"
																style="
																	width: 100%;
																"
															>
																<tr>
																	<td
																		class="t268"
																	>
																		<table
																			role="presentation"
																			width="100%"
																			cellpadding="0"
																			cellspacing="0"
																			style="
																				width: 100% !important;
																			"
																		>
																			<tr>
																				<td
																					align="center"
																				>
																					<table
																						class="t267"
																						role="presentation"
																						cellpadding="0"
																						cellspacing="0"
																						style="
																							margin-left: auto;
																							margin-right: auto;
																						"
																					>
																						<tr>
																							<td
																								width="512"
																								class="t266"
																								style="
																									width: 800px;
																								"
																							>
																								<table
																									class="t265"
																									role="presentation"
																									cellpadding="0"
																									cellspacing="0"
																									width="100%"
																									style="
																										width: 100%;
																									"
																								>
																									<tr>
																										<td
																											class="t264"
																										>
																											<div
																												class="t263"
																												style="
																													width: 100%;
																													text-align: left;
																												"
																											>
																												<div
																													class="t262"
																													style="
																														display: inline-block;
																													"
																												>
																													<table
																														class="t261"
																														role="presentation"
																														cellpadding="0"
																														cellspacing="0"
																														align="left"
																														valign="middle"
																													>
																														<tr
																															class="t260"
																														>
																															<td></td>
																															<td
																																class="t215"
																																width="163.42857"
																																valign="middle"
																															>
																																<table
																																	role="presentation"
																																	width="100%"
																																	cellpadding="0"
																																	cellspacing="0"
																																	class="t214"
																																	style="
																																		width: 100%;
																																	"
																																>
																																	<tr>
																																		<td
																																			class="t212"
																																			style="
																																				overflow: hidden;
																																				border-radius: 12px
																																					12px
																																					12px
																																					12px;
																																			"
																																		>
																																			<div
																																				style="
																																					font-size: 0px;
																																				"
																																			>
																																				<img
																																					class="t211"
																																					style="
																																						display: block;
																																						border: 0;
																																						height: auto;
																																						width: 100%;
																																						margin: 0;
																																						max-width: 100%;
																																					"
																																					width="139.42857142857142"
																																					height="185.90476190476187"
																																					alt=""
																																					src=${imgSrc}
																																				/>
																																			</div>
																																		</td>
																																		<td
																																			class="t213"
																																			style="
																																				width: 24px;
																																			"
																																			width="24"
																																		></td>
																																	</tr>
																																</table>
																															</td>
																															<td
																																class="t259"
																																width="348.57143"
																																valign="middle"
																															>
																																<table
																																	role="presentation"
																																	width="100%"
																																	cellpadding="0"
																																	cellspacing="0"
																																	class="t258"
																																	style="
																																		width: 100%;
																																	"
																																>
																																	<tr>
																																		<td
																																			class="t257"
																																		>
																																			<table
																																				role="presentation"
																																				width="100%"
																																				cellpadding="0"
																																				cellspacing="0"
																																				style="
																																					width: 100% !important;
																																				"
																																			>
																																				<tr>
																																					<td>
																																						<table
																																							class="t251"
																																							role="presentation"
																																							cellpadding="0"
																																							cellspacing="0"
																																						>
																																							<tr>
																																								<td
																																									width="348.57142857142856"
																																									class="t250"
																																									style="
																																										width: 600px;
																																									"
																																								>
																																									<table
																																										class="t249"
																																										role="presentation"
																																										cellpadding="0"
																																										cellspacing="0"
																																										width="100%"
																																										style="
																																											width: 100%;
																																										"
																																									>
																																										<tr>
																																											<td
																																												class="t248"
																																											>
																																												<div
																																													class="t247"
																																													style="
																																														width: 100%;
																																														text-align: left;
																																													"
																																												>
																																													<div
																																														class="t246"
																																														style="
																																															display: inline-block;
																																														"
																																													>
																																														<table
																																															class="t245"
																																															role="presentation"
																																															cellpadding="0"
																																															cellspacing="0"
																																															align="left"
																																															valign="middle"
																																														>
																																															<tr
																																																class="t244"
																																															>
																																																<td></td>
																																																<td
																																																	class="t239"
																																																	width="209.14286"
																																																	valign="middle"
																																																>
																																																	<table
																																																		role="presentation"
																																																		width="100%"
																																																		cellpadding="0"
																																																		cellspacing="0"
																																																		class="t238"
																																																		style="
																																																			width: 100%;
																																																		"
																																																	>
																																																		<tr>
																																																			<td
																																																				class="t237"
																																																				style="
																																																					padding: 0
																																																						12px
																																																						0
																																																						0;
																																																				"
																																																			>
																																																				<table
																																																					role="presentation"
																																																					width="100%"
																																																					cellpadding="0"
																																																					cellspacing="0"
																																																					style="
																																																						width: 100% !important;
																																																					"
																																																				>
																																																					<tr>
																																																						<td
																																																							align="center"
																																																						>
																																																							<table
																																																								class="t220"
																																																								role="presentation"
																																																								cellpadding="0"
																																																								cellspacing="0"
																																																								style="
																																																									margin-left: auto;
																																																									margin-right: auto;
																																																								"
																																																							>
																																																								<tr>
																																																									<td
																																																										width="197.1428571428571"
																																																										class="t219"
																																																										style="
																																																											width: 600px;
																																																										"
																																																									>
																																																										<table
																																																											class="t218"
																																																											role="presentation"
																																																											cellpadding="0"
																																																											cellspacing="0"
																																																											width="100%"
																																																											style="
																																																												width: 100%;
																																																											"
																																																										>
																																																											<tr>
																																																												<td
																																																													class="t217"
																																																												>
																																																													<p
																																																														class="t216"
																																																														style="
																																																															margin: 0;
																																																															margin: 0;
																																																															font-family:
																																																																Nunito
																																																																	Sans,
																																																																BlinkMacSystemFont,
																																																																Segoe
																																																																	UI,
																																																																Helvetica
																																																																	Neue,
																																																																Arial,
																																																																sans-serif;
																																																															line-height: 24px;
																																																															font-weight: 700;
																																																															font-style: normal;
																																																															font-size: 16px;
																																																															text-decoration: none;
																																																															text-transform: none;
																																																															direction: ltr;
																																																															color: #000000;
																																																															text-align: left;
																																																															mso-line-height-rule: exactly;
																																																															mso-text-raise: 2px;
																																																														"
																																																													>
																																																														${title}
																																																													</p>
																																																												</td>
																																																											</tr>
																																																										</table>
																																																									</td>
																																																								</tr>
																																																							</table>
																																																						</td>
																																																					</tr>
																																																					<tr>
																																																						<td>
																																																							<div
																																																								class="t221"
																																																								style="
																																																									mso-line-height-rule: exactly;
																																																									mso-line-height-alt: 12px;
																																																									line-height: 12px;
																																																									font-size: 1px;
																																																									display: block;
																																																								"
																																																							>
																																																								&nbsp;&nbsp;
																																																							</div>
																																																						</td>
																																																					</tr>
																																																					<tr>
																																																						<td
																																																							align="center"
																																																						>
																																																							<table
																																																								class="t226"
																																																								role="presentation"
																																																								cellpadding="0"
																																																								cellspacing="0"
																																																								style="
																																																									margin-left: auto;
																																																									margin-right: auto;
																																																								"
																																																							>
																																																								<tr>
																																																									<td
																																																										width="197.1428571428571"
																																																										class="t225"
																																																										style="
																																																											width: 600px;
																																																										"
																																																									>
																																																										<table
																																																											class="t224"
																																																											role="presentation"
																																																											cellpadding="0"
																																																											cellspacing="0"
																																																											width="100%"
																																																											style="
																																																												width: 100%;
																																																											"
																																																										>
																																																											<tr>
																																																												<td
																																																													class="t223"
																																																												>
																																																													<p
																																																														class="t222"
																																																														style="
																																																															margin: 0;
																																																															margin: 0;
																																																															font-family:
																																																																Nunito
																																																																	Sans,
																																																																BlinkMacSystemFont,
																																																																Segoe
																																																																	UI,
																																																																Helvetica
																																																																	Neue,
																																																																Arial,
																																																																sans-serif;
																																																															line-height: 24px;
																																																															font-weight: 500;
																																																															font-style: normal;
																																																															font-size: 12px;
																																																															text-decoration: none;
																																																															text-transform: none;
																																																															direction: ltr;
																																																															color: #747474;
																																																															text-align: left;
																																																															mso-line-height-rule: exactly;
																																																															mso-text-raise: 4px;
																																																														"
																																																													>
																																																														${location}
																																																													</p>
																																																												</td>
																																																											</tr>
																																																										</table>
																																																									</td>
																																																								</tr>
																																																							</table>
																																																						</td>
																																																					</tr>
																																																					<tr>
																																																						<td
																																																							align="center"
																																																						>
																																																							<table
																																																								class="t231"
																																																								role="presentation"
																																																								cellpadding="0"
																																																								cellspacing="0"
																																																								style="
																																																									margin-left: auto;
																																																									margin-right: auto;
																																																								"
																																																							>
																																																								<tr>
																																																									<td
																																																										width="197.1428571428571"
																																																										class="t230"
																																																										style="
																																																											width: 600px;
																																																										"
																																																									>
																																																										<table
																																																											class="t229"
																																																											role="presentation"
																																																											cellpadding="0"
																																																											cellspacing="0"
																																																											width="100%"
																																																											style="
																																																												width: 100%;
																																																											"
																																																										>
																																																											<tr>
																																																												<td
																																																													class="t228"
																																																												>
																																																													<p
																																																														class="t227"
																																																														style="
																																																															margin: 0;
																																																															margin: 0;
																																																															font-family:
																																																																Nunito
																																																																	Sans,
																																																																BlinkMacSystemFont,
																																																																Segoe
																																																																	UI,
																																																																Helvetica
																																																																	Neue,
																																																																Arial,
																																																																sans-serif;
																																																															line-height: 24px;
																																																															font-weight: 400;
																																																															font-style: normal;
																																																															font-size: 12px;
																																																															text-decoration: none;
																																																															text-transform: none;
																																																															direction: ltr;
																																																															color: #747474;
																																																															text-align: left;
																																																															mso-line-height-rule: exactly;
																																																															mso-text-raise: 4px;
																																																														"
																																																													>
																																																														${formatDate(date, 'dd. MM. yyyy. HH:mm ')}(za ${daysUntilEventString})
																																																													</p>
																																																												</td>
																																																											</tr>
																																																										</table>
																																																									</td>
																																																								</tr>
																																																							</table>
																																																						</td>
																																																					</tr>
																																																					<tr>
																																																						<td
																																																							align="center"
																																																						>
																																																							<table
																																																								class="t236"
																																																								role="presentation"
																																																								cellpadding="0"
																																																								cellspacing="0"
																																																								style="
																																																									margin-left: auto;
																																																									margin-right: auto;
																																																								"
																																																							>
																																																								<tr>
																																																									<td
																																																										width="197.1428571428571"
																																																										class="t235"
																																																										style="
																																																											width: 600px;
																																																										"
																																																									>
																																																										<table
																																																											class="t234"
																																																											role="presentation"
																																																											cellpadding="0"
																																																											cellspacing="0"
																																																											width="100%"
																																																											style="
																																																												width: 100%;
																																																											"
																																																										>
																																																											<tr>
																																																												<td
																																																													class="t233"
																																																												>
																																																													<p
																																																														class="t232"
																																																														style="
																																																															margin: 0;
																																																															margin: 0;
																																																															font-family:
																																																																Nunito
																																																																	Sans,
																																																																BlinkMacSystemFont,
																																																																Segoe
																																																																	UI,
																																																																Helvetica
																																																																	Neue,
																																																																Arial,
																																																																sans-serif;
																																																															line-height: 24px;
																																																															font-weight: 500;
																																																															font-style: normal;
																																																															font-size: 12px;
																																																															text-decoration: none;
																																																															text-transform: none;
																																																															direction: ltr;
																																																															color: #747474;
																																																															text-align: left;
																																																															mso-line-height-rule: exactly;
																																																															mso-text-raise: 4px;
																																																														"
																																																													>
																																																														${remainingSpots}
																																																														mjesta
																																																														preostalo
																																																													</p>
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
																																																</td>
																																																<td
																																																	class="t243 hm"
																																																	width="139.42857"
																																																	valign="middle"
																																																>
																																																	<table
																																																		role="presentation"
																																																		width="100%"
																																																		cellpadding="0"
																																																		cellspacing="0"
																																																		class="t242 hm"
																																																		style="
																																																			width: 100%;
																																																		"
																																																	>
																																																		<tr>
																																																			<td
																																																				class="t241 hm"
																																																				style="
																																																					overflow: hidden;
																																																					background-color: #dedede;
																																																					text-align: center;
																																																					line-height: 22px;
																																																					mso-line-height-rule: exactly;
																																																					mso-text-raise: 2px;
																																																					padding: 8px
																																																						12px
																																																						8px
																																																						12px;
																																																					border-radius: 8px
																																																						8px
																																																						8px
																																																						8px;
																																																				"
																																																			>
																																																				<a
																																																					href=${reservationUrl}
																																																					class="t240 hm"
																																																					style="
																																																						display: block;
																																																						margin: 0;
																																																						margin: 0;
																																																						font-family:
																																																							Nunito
																																																								Sans,
																																																							BlinkMacSystemFont,
																																																							Segoe
																																																								UI,
																																																							Helvetica
																																																								Neue,
																																																							Arial,
																																																							sans-serif;
																																																						line-height: 22px;
																																																						font-weight: 700;
																																																						font-style: normal;
																																																						font-size: 14px;
																																																						text-decoration: none;
																																																						text-transform: none;
																																																						direction: ltr;
																																																						color: #000000;
																																																						text-align: center;
																																																						mso-line-height-rule: exactly;
																																																						mso-text-raise: 2px;
																																																					"
																																																					>Rezerviraj</a
																																																				>
																																																			</td>
																																																		</tr>
																																																	</table>
																																																</td>
																																																<td></td>
																																															</tr>
																																														</table>
																																													</div>
																																												</div>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																				<!--[if !mso]>-->
																																				<tr>
																																					<td
																																						align="left"
																																					>
																																						<table
																																							class="t256 hd"
																																							role="presentation"
																																							cellpadding="0"
																																							cellspacing="0"
																																							style="
																																								margin-right: auto;
																																							"
																																						>
																																							<tr>
																																								<td
																																									width="348.57142857142856"
																																									class="t255 hd"
																																									style="
																																										background-color: #dedede;
																																										overflow: hidden;
																																										width: 400px;
																																										border-radius: 8px
																																											8px
																																											8px
																																											8px;
																																									"
																																								>
																																									<table
																																										class="t254 hd"
																																										role="presentation"
																																										cellpadding="0"
																																										cellspacing="0"
																																										width="100%"
																																										style="
																																											width: 100%;
																																										"
																																									>
																																										<tr>
																																											<td
																																												class="t253 hd"
																																												style="
																																													text-align: center;
																																													line-height: 22px;
																																													mso-line-height-rule: exactly;
																																													mso-text-raise: 2px;
																																													padding: 8px
																																														12px
																																														8px
																																														12px;
																																												"
																																											>
																																												<a
																																													href=${reservationUrl}
																																													class="t252 hd"
																																													style="
																																														display: block;
																																														margin: 0;
																																														margin: 0;
																																														font-family:
																																															Nunito
																																																Sans,
																																															BlinkMacSystemFont,
																																															Segoe
																																																UI,
																																															Helvetica
																																																Neue,
																																															Arial,
																																															sans-serif;
																																														line-height: 22px;
																																														font-weight: 700;
																																														font-style: normal;
																																														font-size: 14px;
																																														text-decoration: none;
																																														text-transform: none;
																																														direction: ltr;
																																														color: #000000;
																																														text-align: center;
																																														mso-line-height-rule: exactly;
																																														mso-text-raise: 2px;
																																													"
																																													>Rezerviraj</a
																																												>
																																											</td>
																																										</tr>
																																									</table>
																																								</td>
																																							</tr>
																																						</table>
																																					</td>
																																				</tr>
																																				<!--<![endif]-->
																																			</table>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																															<td></td>
																														</tr>
																													</table>
																												</div>
																											</div>
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
		</td>
	</tr>`;
};
