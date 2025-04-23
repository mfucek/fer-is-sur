import { format as formatDate } from 'date-fns';

// cancellation
export const reservationCancelledCard = ({
	title,
	location,
	date
}: {
	title: string;
	location: string;
	date: Date;
}) => {
	return `<tr>
		<td align="center">
			<table
				class="t205"
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
						class="t204"
						style="
							background-color: #ffffff;
							overflow: hidden;
							width: 600px;
							border-radius: 16px 16px 16px 16px;
						"
					>
						<table
							class="t203"
							role="presentation"
							cellpadding="0"
							cellspacing="0"
							width="100%"
							style="width: 100%"
						>
							<tr>
								<td
									class="t202"
									style="padding: 40px 0 40px 0"
								>
									<table
										role="presentation"
										width="100%"
										cellpadding="0"
										cellspacing="0"
										style="width: 100% !important"
									>
										<tr>
											<td align="center">
												<table
													class="t200"
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
															class="t199"
															style="width: 600px"
														>
															<table
																class="t198"
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
																		class="t197"
																		style="
																			padding: 0
																				40px 0
																				40px;
																		"
																	>
																		<div
																			class="t196"
																			style="
																				width: 100%;
																				text-align: left;
																			"
																		>
																			<div
																				class="t195"
																				style="
																					display: inline-block;
																				"
																			>
																				<table
																					class="t194"
																					role="presentation"
																					cellpadding="0"
																					cellspacing="0"
																					align="left"
																					valign="middle"
																				>
																					<tr
																						class="t193"
																					>
																						<td></td>
																						<td
																							class="t177"
																							width="342.26087"
																							valign="middle"
																						>
																							<table
																								role="presentation"
																								width="100%"
																								cellpadding="0"
																								cellspacing="0"
																								class="t176"
																								style="
																									width: 100%;
																								"
																							>
																								<tr>
																									<td
																										class="t174"
																										style="
																											border-right: 1px
																												solid
																												#e9e9e9;
																											padding: 0
																												40px
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
																													align="left"
																												>
																													<table
																														class="t167"
																														role="presentation"
																														cellpadding="0"
																														cellspacing="0"
																														style="
																															margin-right: auto;
																															max-width: 277.26px;
																														"
																													>
																														<tr>
																															<td
																																class="t166"
																																style="
																																	background-color: #fceae6;
																																	overflow: hidden;
																																	width: auto;
																																	border-radius: 24px
																																		24px
																																		24px
																																		24px;
																																"
																															>
																																<table
																																	class="t165"
																																	role="presentation"
																																	cellpadding="0"
																																	cellspacing="0"
																																	style="
																																		width: auto;
																																		max-width: 277.26px;
																																	"
																																>
																																	<tr>
																																		<td
																																			class="t164"
																																			style="
																																				padding: 4px
																																					12px
																																					4px
																																					12px;
																																			"
																																		>
																																			<p
																																				class="t163"
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
																																					line-height: 22px;
																																					font-weight: 800;
																																					font-style: normal;
																																					font-size: 12px;
																																					text-decoration: none;
																																					text-transform: none;
																																					letter-spacing: -0.56px;
																																					direction: ltr;
																																					color: #df3434;
																																					text-align: left;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 3px;
																																				"
																																			>
																																				Rezervacija
																																				otkazana
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
																														class="t169"
																														style="
																															mso-line-height-rule: exactly;
																															mso-line-height-alt: 8px;
																															line-height: 8px;
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
																														class="t173"
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
																																width="277.26086956521743"
																																class="t172"
																																style="
																																	width: 600px;
																																"
																															>
																																<table
																																	class="t171"
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
																																			class="t170"
																																		>
																																			<h1
																																				class="t168"
																																				style="
																																					margin: 0;
																																					margin: 0;
																																					font-family:
																																						Albert
																																							Sans,
																																						BlinkMacSystemFont,
																																						Segoe
																																							UI,
																																						Helvetica
																																							Neue,
																																						Arial,
																																						sans-serif;
																																					line-height: 26px;
																																					font-weight: 800;
																																					font-style: normal;
																																					font-size: 24px;
																																					text-decoration: none;
																																					text-transform: none;
																																					letter-spacing: -1.56px;
																																					direction: ltr;
																																					color: #191919;
																																					text-align: left;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 1px;
																																				"
																																			>
																																				${title}
																																			</h1>
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
																										class="t175"
																										style="
																											width: 24px;
																										"
																										width="24"
																									></td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="t192"
																							width="169.73913"
																							valign="middle"
																						>
																							<table
																								role="presentation"
																								width="100%"
																								cellpadding="0"
																								cellspacing="0"
																								class="t191"
																								style="
																									width: 100%;
																								"
																							>
																								<tr>
																									<td
																										class="t190"
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
																														class="t183"
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
																																width="169.73913043478262"
																																class="t182"
																																style="
																																	width: 368px;
																																"
																															>
																																<table
																																	class="t181"
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
																																			class="t180"
																																		>
																																			<p
																																				class="t179"
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
																																					line-height: 22px;
																																					font-weight: 500;
																																					font-style: normal;
																																					font-size: 14px;
																																					text-decoration: none;
																																					text-transform: none;
																																					letter-spacing: -0.56px;
																																					direction: ltr;
																																					color: #747474;
																																					text-align: right;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 2px;
																																				"
																																			>
																																				${location}<span
																																					class="t178"
																																					style="
																																						margin: 0;
																																						margin: 0;
																																						font-weight: bold;
																																						mso-line-height-rule: exactly;
																																					"
																																					>&#xFEFF;</span
																																				>
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
																														class="t189"
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
																																width="169.73913043478262"
																																class="t188"
																																style="
																																	width: 368px;
																																"
																															>
																																<table
																																	class="t187"
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
																																			class="t186"
																																		>
																																			<p
																																				class="t185"
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
																																					line-height: 22px;
																																					font-weight: 500;
																																					font-style: normal;
																																					font-size: 14px;
																																					text-decoration: none;
																																					text-transform: none;
																																					letter-spacing: -0.56px;
																																					direction: ltr;
																																					color: #747474;
																																					text-align: right;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 2px;
																																				"
																																			>
																																				${formatDate(date, 'dd. MM. yyyy. HH:mm')}
																																					<span
																																					class="t184"
																																					style="
																																						margin: 0;
																																						margin: 0;
																																						font-weight: bold;
																																						mso-line-height-rule: exactly;
																																					"
																																					>&#xFEFF;</span
																																				>
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
	<tr>
		<td>
			<div
				class="t409"
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
	</tr>`;
};
