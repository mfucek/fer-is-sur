import { formatPrice } from '@/utils/format-price';
import { format as formatDate } from 'date-fns';

// reservation
export const couponGiftCard = ({
	code,
	value,
	expiryDate
}: {
	code: string;
	value: number;
	expiryDate: Date;
}) => {
	return `<tr>
		<td align="center">
			<table
				class="t41"
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
						class="t40"
						style="
							background-color: #ffffff;
							overflow: hidden;
							width: 600px;
							border-radius: 16px 16px 16px 16px;
						"
					>
						<table
							class="t39"
							role="presentation"
							cellpadding="0"
							cellspacing="0"
							width="100%"
							style="width: 100%"
						>
							<tr>
								<td
									class="t38"
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
													class="t37"
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
															class="t36"
															style="width: 600px"
														>
															<table
																class="t35"
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
																		class="t34"
																		style="
																			padding: 0
																				40px 0
																				40px;
																		"
																	>
																		<div
																			class="t33"
																			style="
																				width: 100%;
																				text-align: left;
																			"
																		>
																			<div
																				class="t32"
																				style="
																					display: inline-block;
																				"
																			>
																				<table
																					class="t31"
																					role="presentation"
																					cellpadding="0"
																					cellspacing="0"
																					align="left"
																					valign="middle"
																				>
																					<tr
																						class="t30"
																					>
																						<td></td>
																						<td
																							class="t14"
																							width="342.26087"
																							valign="middle"
																						>
																							<table
																								role="presentation"
																								width="100%"
																								cellpadding="0"
																								cellspacing="0"
																								class="t13"
																								style="
																									width: 100%;
																								"
																							>
																								<tr>
																									<td
																										class="t11"
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
																														class="t4"
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
																																class="t3"
																																style="
																																	background-color: #ebf1f7;
																																	overflow: hidden;
																																	width: auto;
																																	border-radius: 24px
																																		24px
																																		24px
																																		24px;
																																"
																															>
																																<table
																																	class="t2"
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
																																			class="t1"
																																			style="
																																				padding: 4px
																																					12px
																																					4px
																																					12px;
																																			"
																																		>
																																			<p
																																				class="t0"
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
																																					color: #3478df;
																																					text-align: left;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 3px;
																																				"
																																			>
																																				Poklon bon
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
																														class="t6"
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
																														class="t10"
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
																																class="t9"
																																style="
																																	width: 600px;
																																"
																															>
																																<table
																																	class="t8"
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
																																			class="t7"
																																		>
																																			<h1
																																				class="t5"
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
																																				${code}
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
																										class="t12"
																										style="
																											width: 24px;
																										"
																										width="24"
																									></td>
																								</tr>
																							</table>
																						</td>
																						<td
																							class="t29"
																							width="169.73913"
																							valign="middle"
																						>
																							<table
																								role="presentation"
																								width="100%"
																								cellpadding="0"
																								cellspacing="0"
																								class="t28"
																								style="
																									width: 100%;
																								"
																							>
																								<tr>
																									<td
																										class="t27"
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
																														class="t20"
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
																																class="t19"
																																style="
																																	width: 368px;
																																"
																															>
																																<table
																																	class="t18"
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
																																			class="t17"
																																		>
																																			<p
																																				class="t16"
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
																																				Vrijednosti do ${formatPrice(value)} EUR<span
																																					class="t15"
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
																														class="t26"
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
																																class="t25"
																																style="
																																	width: 368px;
																																"
																															>
																																<table
																																	class="t24"
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
																																			class="t23"
																																		>
																																			<p
																																				class="t22"
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
																																				Ističe ${formatDate(expiryDate, 'dd. MM. yyyy.')}
																																				<span
																																					class="t21"
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
				class="t158"
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
