import { formatPrice } from '@/utils/format-price';

export const reservationDetails = (
	{
		totalPrice,
		cancellationUrl,
		message
	}: { totalPrice: number; cancellationUrl?: string; message: string },
	...children: string[]
) => {
	return `<tr>
		<td align="center">
			<table
				class="t162"
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
						class="t161"
						style="
							background-color: #ffffff;
							overflow: hidden;
							width: 600px;
							border-radius: 16px 16px 16px 16px;
						"
					>
						<table
							class="t160"
							role="presentation"
							cellpadding="0"
							cellspacing="0"
							width="100%"
							style="width: 100%"
						>
							<tr>
								<td class="t159">
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
													class="t46"
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
															class="t45"
															style="width: 600px"
														>
															<table
																class="t44"
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
																		class="t43"
																		style="
																			padding: 40px
																				40px 40px
																				40px;
																		"
																	>
																		<p
																			class="t42"
																			style="
																				margin: 0;
																				margin: 0;
																				font-family:
																					Nunito
																						Sans,
																					BlinkMacSystemFont,
																					Segoe UI,
																					Helvetica
																						Neue,
																					Arial,
																					sans-serif;
																				line-height: 24px;
																				font-weight: 500;
																				font-style: normal;
																				font-size: 16px;
																				text-decoration: none;
																				text-transform: none;
																				letter-spacing: -0.56px;
																				direction: ltr;
																				color: #333333;
																				text-align: center;
																				mso-line-height-rule: exactly;
																				mso-text-raise: 2px;
																			"
																		>
																			${message}
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
													class="t117"
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
													class="t121"
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
															class="t120"
															style="width: 600px"
														>
															<table
																class="t119"
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
																		class="t118"
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
																						class="t100"
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
																								class="t99"
																								style="
																									width: 600px;
																								"
																							>
																								<table
																									class="t98"
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
																											class="t97"
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
																												${children}
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
																				<td
																					align="center"
																				>
																					<table
																						class="t116"
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
																								class="t115"
																								style="
																									border-top: 1px
																										solid
																										#cccccc;
																									width: 800px;
																								"
																							>
																								<table
																									class="t114"
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
																											class="t113"
																											style="
																												padding: 20px
																													0
																													20px
																													0;
																											"
																										>
																											<div
																												class="t112"
																												style="
																													width: 100%;
																													text-align: left;
																												"
																											>
																												<div
																													class="t111"
																													style="
																														display: inline-block;
																													"
																												>
																													<table
																														class="t110"
																														role="presentation"
																														cellpadding="0"
																														cellspacing="0"
																														align="left"
																														valign="top"
																													>
																														<tr
																															class="t109"
																														>
																															<td></td>
																															<td
																																class="t104"
																																width="256"
																																valign="top"
																															>
																																<table
																																	role="presentation"
																																	width="100%"
																																	cellpadding="0"
																																	cellspacing="0"
																																	class="t103"
																																	style="
																																		width: 100%;
																																	"
																																>
																																	<tr>
																																		<td
																																			class="t102"
																																		>
																																			<p
																																				class="t101"
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
																																				Total
																																			</p>
																																		</td>
																																	</tr>
																																</table>
																															</td>
																															<td
																																class="t108"
																																width="256"
																																valign="top"
																															>
																																<table
																																	role="presentation"
																																	width="100%"
																																	cellpadding="0"
																																	cellspacing="0"
																																	class="t107"
																																	style="
																																		width: 100%;
																																	"
																																>
																																	<tr>
																																		<td
																																			class="t106"
																																		>
																																			<p
																																				class="t105"
																																				style="
																																					margin: 0;
																																					margin: 0;
																																					font-family:
																																						Inter
																																							Tight,
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
																																					font-size: 20px;
																																					text-decoration: none;
																																					text-transform: none;
																																					direction: ltr;
																																					color: #000000;
																																					text-align: right;
																																					mso-line-height-rule: exactly;
																																					mso-text-raise: 1px;
																																				"
																																			>
																																				${formatPrice(totalPrice)} EUR
																																			</p>
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
													class="t153"
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
										${
											cancellationUrl &&
											`<tr>
												<td align="center">
													<table
														class="t157"
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
																class="t156"
																style="width: 600px"
															>
																<table
																	class="t155"
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
																			class="t154"
																			style="
																				padding: 0
																					12px 12px
																					12px;
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
																					<td>
																						<table
																							class="t138 hm"
																							role="presentation"
																							cellpadding="0"
																							cellspacing="0"
																						>
																							<tr>
																								<td
																									width="568"
																									class="t137 hm"
																									style="
																										background-color: #f5f5f5;
																										overflow: hidden;
																										width: 600px;
																										border-radius: 8px
																											8px
																											8px
																											8px;
																									"
																								>
																									<table
																										class="t136 hm"
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
																												class="t135 hm"
																												style="
																													padding: 24px
																														24px
																														24px
																														24px;
																												"
																											>
																												<div
																													class="t134 hm"
																													style="
																														width: 100%;
																														text-align: center;
																													"
																												>
																													<div
																														class="t133 hm"
																														style="
																															display: inline-block;
																														"
																													>
																														<table
																															class="t132 hm"
																															role="presentation"
																															cellpadding="0"
																															cellspacing="0"
																															align="center"
																															valign="middle"
																														>
																															<tr
																																class="t131 hm"
																															>
																																<td></td>
																																<td
																																	class="t126"
																																	valign="middle"
																																>
																																	<table
																																		role="presentation"
																																		width="100%"
																																		cellpadding="0"
																																		cellspacing="0"
																																		class="t125"
																																		style="
																																			width: auto;
																																		"
																																	>
																																		<tr>
																																			<td
																																				class="t123"
																																			>
																																				<p
																																					class="t122"
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
																																						text-align: left;
																																						mso-line-height-rule: exactly;
																																						mso-text-raise: 2px;
																																					"
																																				>
																																					Otkazivanje
																																					je
																																					mogu&#x107;e
																																					unutar
																																					48h
																																					do
																																					vremena
																																					radionice.
																																					Ukoliko
																																					imate
																																					&#x17E;elju
																																					otkazati,
																																					ljubazno
																																					Vas
																																					molimo
																																					da
																																					pratite
																																					uputstva
																																					na
																																					ovom
																																					linku.
																																				</p>
																																			</td>
																																			<td
																																				class="t124"
																																				style="
																																					width: 24px;
																																				"
																																				width="24"
																																			></td>
																																		</tr>
																																	</table>
																																</td>
																																<td
																																	class="t130"
																																	width="30%"
																																	valign="middle"
																																>
																																	<table
																																		role="presentation"
																																		width="100%"
																																		cellpadding="0"
																																		cellspacing="0"
																																		class="t129"
																																		style="
																																			width: 100%;
																																		"
																																	>
																																		<tr>
																																			<td
																																				class="t128"
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
																																					href="${cancellationUrl}"
																																					class="t127"
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
																																					>Otka&#x17E;i
																																					rezervaciju</a
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
																						align="center"
																					>
																						<table
																							class="t152 hd"
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
																									width="568"
																									class="t151 hd"
																									style="
																										background-color: #e9e9e9;
																										overflow: hidden;
																										width: 600px;
																										border-radius: 8px
																											8px
																											8px
																											8px;
																									"
																								>
																									<table
																										class="t150 hd"
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
																												class="t149 hd"
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
																																class="t143"
																																role="presentation"
																																cellpadding="0"
																																cellspacing="0"
																																style="
																																	margin-left: auto;
																																	margin-right: auto;
																																	max-width: 568px;
																																"
																															>
																																<tr>
																																	<td
																																		class="t142"
																																		style="
																																			width: auto;
																																		"
																																	>
																																		<table
																																			class="t141"
																																			role="presentation"
																																			cellpadding="0"
																																			cellspacing="0"
																																			style="
																																				width: auto;
																																				max-width: 568px;
																																			"
																																		>
																																			<tr>
																																				<td
																																					class="t140"
																																					style="
																																						padding: 0
																																							0
																																							24px
																																							0;
																																					"
																																				>
																																					<p
																																						class="t139"
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
																																							line-height: 22px;
																																							font-weight: 500;
																																							font-style: normal;
																																							font-size: 14px;
																																							text-decoration: none;
																																							text-transform: none;
																																							letter-spacing: -0.56px;
																																							direction: ltr;
																																							color: #747474;
																																							text-align: left;
																																							mso-line-height-rule: exactly;
																																							mso-text-raise: 2px;
																																						"
																																					>
																																						Otkazivanje
																																						je
																																						mogu&#x107;e
																																						unutar
																																						48h
																																						do
																																						vremena
																																						radionice.
																																						Ukoliko
																																						imate
																																						&#x17E;elju
																																						otkazati,
																																						ljubazno
																																						Vas
																																						molimo
																																						da
																																						pratite
																																						uputstva
																																						na
																																						ovom
																																						linku.
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
																															align="left"
																														>
																															<table
																																class="t148"
																																role="presentation"
																																cellpadding="0"
																																cellspacing="0"
																																style="
																																	margin-right: auto;
																																"
																															>
																																<tr>
																																	<td
																																		width="400"
																																		class="t147"
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
																																			class="t146"
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
																																					class="t145"
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
																																						href="${cancellationUrl}"
																																						class="t144"
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
																																						>Otka&#x17E;i
																																						rezervaciju</a
																																					>
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
																				<!--<![endif]-->
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>`
										}
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
				class="t201"
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
