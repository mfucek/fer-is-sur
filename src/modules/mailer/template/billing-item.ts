import { formatPrice } from '@/utils/format-price';

export const billingItem = ({
	title,
	subtitle,
	price
}: {
	title: string;
	subtitle: string;
	price: number;
}) => {
	return `<tr>
		<td
			align="center"
		>
			<table
				class="t71"
				role="presentation"
				cellpadding="0"
				cellspacing="0"
				style="
					margin-left: auto;
					margin-right: auto;
					padding: 12px
						0;
				"
			>
				<tr>
					<td
						width="512"
						class="t70"
						style="
							width: 800px;
						"
					>
						<table
							class="t69"
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
									class="t68"
								>
									<div
										class="t67"
										style="
											width: 100%;
											text-align: left;
										"
									>
										<div
											class="t66"
											style="
												display: inline-block;
											"
										>
											<table
												class="t65"
												role="presentation"
												cellpadding="0"
												cellspacing="0"
												align="left"
												valign="middle"
											>
												<tr
													class="t64"
												>
													<td></td>
													<td
														class="t59"
														width="256"
														valign="middle"
													>
														<table
															role="presentation"
															width="100%"
															cellpadding="0"
															cellspacing="0"
															class="t58"
															style="
																width: 100%;
															"
														>
															<tr>
																<td
																	class="t57"
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
																					class="t51"
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
																							width="255.99999999999997"
																							class="t50"
																							style="
																								width: 600px;
																							"
																						>
																							<table
																								class="t49"
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
																										class="t48"
																									>
																										<p
																											class="t47"
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
																			<td
																				align="center"
																			>
																				<table
																					class="t56"
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
																							width="255.99999999999997"
																							class="t55"
																							style="
																								width: 600px;
																							"
																						>
																							<table
																								class="t54"
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
																										class="t53"
																									>
																										<p
																											class="t52"
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
																												line-height: 16px;
																												font-weight: 700;
																												font-style: normal;
																												font-size: 12px;
																												text-decoration: none;
																												text-transform: none;
																												direction: ltr;
																												color: #adadad;
																												text-align: left;
																												mso-line-height-rule: exactly;
																												mso-text-raise: 1px;
																											"
																										>
																											${subtitle}
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
														class="t63"
														width="256"
														valign="middle"
													>
														<table
															role="presentation"
															width="100%"
															cellpadding="0"
															cellspacing="0"
															class="t62"
															style="
																width: 100%;
															"
														>
															<tr>
																<td
																	class="t61"
																>
																	<p
																		class="t60"
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
																			font-size: 16px;
																			text-decoration: none;
																			text-transform: none;
																			direction: ltr;
																			color: #747474;
																			text-align: right;
																			mso-line-height-rule: exactly;
																			mso-text-raise: 2px;
																		"
																	>
																		${formatPrice(price)} EUR
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
	</tr>`;
};
